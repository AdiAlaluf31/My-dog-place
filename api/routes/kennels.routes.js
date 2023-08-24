import { Router } from 'express';
import {Kennel} from "../models/kennel.model.js";
import {Reservation} from "../models/reservation.model.js";
import {verifyAdmin} from "../utils/verifyToken.js";
const router = Router();

// write a fetch call for the following endpoint:
// POST www.abc.com/api/kennels
// body: { city: "London", maxCapacity: 10 }
// response: { _id: "123", city: "London", maxCapacity: 10, price: 80, description: "Awesome!" }
router.post('/', verifyAdmin, async (req, res) => {
    try {
        // Create a new kennel
        const newKennel = await Kennel.create(req.body);
        res.status(201).json(newKennel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create kennel' });
    }
});

// get all kennels
// GET www.abc.com/api/kennels
// response: [{ _id: "123", city: "London", maxCapacity: 10, price: 65, description: "wow!" }, { _id: "456", city: "Paris", maxCapacity: 5, description: "wow2!" }]
router.get('/', async (req, res) => {
    try {
        const kennels = await Kennel.find();
        res.json(kennels);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch kennels' });
    }
});

// // get a kennel by id
// // GET www.abc.com/api/kennels/123
// // response: { _id: "123", city: "London", maxCapacity: 10, price: 65, description: "wow!" }
// router.get('/:id', async (req, res) => {
//     try {
//         const kennel = await Kennel.findById(req.params.id);
//         res.json(kennel);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch kennel' });
//     }
// });

// update a kennel by id
// PUT www.abc.com/api/kennels/123
// body: { city: "London", maxCapacity: 10, price: 65, description: "wow!" }
// response: { _id: "123", city: "London", maxCapacity: 10, price: 65, description: "wow!" }
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedKennel = await Kennel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: false },
        );
        res.status(201).json(updatedKennel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update kennel' });
    }
});

// www.abc.com/kennels/availability?city=London&startDate=2021-01-01&endDate=2021-01-10
router.get('/availability', async (req, res) => {
    try {
        const { city, startDate, endDate } = req.query;
        const cityKennels = await Kennel.find({ city });
        const kennelsReservations = await Reservation.find({
            kennel: { $in: cityKennels.map((kennel) => kennel._id) },
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
        });

        const availableKennels = cityKennels.filter((kennel) => {
            const reservationsInKennel = kennelsReservations.filter(
                (reservation) => reservation.kennel.toString() === kennel._id.toString()
            );

            return reservationsInKennel.length < kennel.maxCapacity;
        });

        res.status(200).json(availableKennels);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch available kennels' });
    }
});

/*
 * @path: /api/reservations/:kennelId?startDate=2021-01-01&endDate=2021-01-10
 * @method: GET
 * @access: public
 * @description: fetch all dogs in a kennel
 */
router.get('/:kennelId/reservations', async (req, res) => {
    try {
        // req.params example: { kennelId: '123', startDate: '2021-01-01', endDate: '2021-01-10' }
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

export default router;
