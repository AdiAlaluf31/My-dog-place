import express from 'express';
import { Reservation } from "../models/reservation.model.js";
import {verifyUser} from "../utils/verifyToken.js";
import {Dog} from "../models/dog.model.js";
import {Kennel} from "../models/kennel.model.js";
const router = express.Router();


router.get('/', verifyUser, async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
});

/*
 * @path: /api/reservations/:id
 * @method: GET
 * @access: public
 * @description: fetch all dogs in a kennel
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const kennelReservations = await Reservation.find({ _id: id });

        res.json(kennelReservations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dogs in the kennel' });
    }
});

router.post('/', verifyUser, async (req, res) => {
    try {
        /*
            * req.body example:
            * {
            *   kennel: '123',
            *   dog: '456',
            *   startDate: '2021-01-01',
            *   endDate: '2021-01-10'
            * }
         */
        const { kennel, dog, startDate, endDate } = req.body;

        // Check if the kennel exists
        const kennelExists = await Kennel.findById(kennel);
        if (!kennelExists) {
            return res.status(404).json({ error: 'Kennel not found' });
        }

        // Check if the dog exists
        const dogExists = await Dog.find({ _id: dog, owner: req.user.id });
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

export default router;
