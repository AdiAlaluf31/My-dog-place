import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Path: api/models/kennel.js
const kennelSchema = new Schema({
    city: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
    manager: { type: String },
});

const Kennel = mongoose.model('Kennel', kennelSchema);
// module.exports = Kennel;

// Path: api/models/reservation.js
const reservationSchema = new Schema({
    dog: { type: Schema.Types.ObjectId, ref: 'Dog', required: true },
    kennel: { type: Schema.Types.ObjectId, ref: 'Kennel', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
// module.exports = Reservation;

// Path: api/models/dog.js
const dogSchema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    registrationDates: [{ type: Date, required: true }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Dog = mongoose.model('Dog', dogSchema);
// module.exports = Dog;

// Path: api/models/user.controller.js
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],
});

const User = mongoose.model('User2', userSchema);
// module.exports = User;



import express from 'express';
const router = express.Router();

router.get('/available-kennels', async (req, res) => {
    try {
        const { city, startDate, endDate } = req.query;

        const availableKennels = await Kennel.find({ city });
        const conflictingReservations = await Reservation.find({
            kennel: { $in: availableKennels.map((kennel) => kennel._id) },
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
        });

        const availableKennelsFiltered = availableKennels.filter((kennel) => {
            const conflictingDogs = conflictingReservations.filter(
                (reservation) => reservation.kennel.toString() === kennel._id.toString()
            );

            return (
                conflictingDogs.length < kennel.maxCapacity
            );
        });

        res.json(availableKennelsFiltered);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch available kennels' });
    }
});


router.get('/kennels/:kennelId/dogs', async (req, res) => {
    try {
        const { kennelId } = req.params;
        const { startDate, endDate } = req.query;

        const kennelRegistration = await Reservation.find({
            kennel: kennelId,
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
        }).select(['dog', 'startDate', 'endDate']).populate('dog');

        res.json(kennelRegistration);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dogs in the kennel' });
    }
});

// router.post('/dogs', async (req, res) => {
//     try {
//         const { kennel, name, breed, startDate, endDate } = req.body;
//         const registrationDates = generateDatesArray(new Date(startDate), new Date(endDate));
//
//         // Check if the kennel has enough capacity for the reservation
//         const kennelCapacity = await Kennel.findById(kennel).select('maxCapacity');
//         const existingReservations = await Reservation.countDocuments({
//             kennel,
//             startDate: { $lte: new Date(endDate) },
//             endDate: { $gte: new Date(startDate) },
//         });
//
//         if (existingReservations >= kennelCapacity.maxCapacity) {
//             return res.status(400).json({ error: 'Kennel is already fully booked for the specified dates' });
//         }
//
//         // Create a new dog and reservation
//         const newDog = await Dog.create({ name, breed, registrationDates });
//         await Reservation.create({ dog: newDog._id, kennel, startDate, endDate });
//
//         res.status(201).json(newDog);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to register dog to the kennel' });
//     }
// });

router.post('/users/:userId/dogs', async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, breed } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new dog for the user
        const newDog = await Dog.create({ name, breed, owner: userId });

        // Add the dog to the user's dogs array
        user.dogs.push(newDog._id);
        await user.save();

        res.status(201).json(newDog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add dog to the user' });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user
        const newUser = await User.create({ name, email });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/kennels', async (req, res) => {
    try {
        const { city, maxCapacity, manager } = req.body;

        // Create a new kennel
        const newKennel = await Kennel.create({ city, maxCapacity, manager });
        res.status(201).json(newKennel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create kennel' });
    }
});

router.post('/reservations', async (req, res) => {
    try {
        const { kennel, dog, startDate, endDate } = req.body;

        // Check if the kennel exists
        const kennelExists = await Kennel.findById(kennel);
        if (!kennelExists) {
            return res.status(404).json({ error: 'Kennel not found' });
        }

        // Check if the dog exists
        const dogExists = await Dog.findById(dog);
        if (!dogExists) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        // Check if the dog is owned by the user making the reservation (optional)
        // If you want to enforce that only the owner of the dog can make a reservation for it,
        // you can add this check. If not needed, you can remove this block.
        // const userId = req.user; // Assuming you have a middleware to extract the user ID from the request
        // if (dogExists.owner.toString() !== userId) {
        //     return res.status(403).json({ error: 'You are not the owner of this dog' });
        // }

        // Check if the kennel has enough capacity for the reservation
        const existingReservations = await Reservation.countDocuments({
            kennel,
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
        });

        if (existingReservations >= kennelExists.maxCapacity) {
            return res.status(400).json({ error: 'Kennel is already fully booked for the specified dates' });
        }

        // Create a new reservation
        const newReservation = await Reservation.create({ dog, kennel, startDate, endDate });
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: 'Failed to make reservation' });
    }
});


// Utility function to generate an array of dates between two dates
function generateDatesArray(startDate, endDate) {
    const datesArray = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        datesArray.push(new Date(date));
    }
    return datesArray;
}

export default router;
