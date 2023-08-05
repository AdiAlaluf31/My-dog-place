import { Router } from 'express';
import {Kennel} from "../models/kennel.model.js";
import {Reservation} from "../models/reservation.model.js";
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { city, maxCapacity, manager } = req.body;

        // Create a new kennel
        const newKennel = await Kennel.create({ city, maxCapacity, manager });
        res.status(201).json(newKennel);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create kennel' });
    }
});

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

        res.json(availableKennels);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch available kennels' });
    }
});

export default router;
