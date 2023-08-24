import { Router } from 'express';
import { verifyUser } from "../utils/verifyToken.js";
import { Dog } from "../models/dog.model.js";
import User from "../models/user.model.js";
const router = Router();

/*
    POST www.abc.com/dogs
    cookie: token
    body:
    {
        name: "Rex",
        breed: "German Shepherd",
        age: 5,
        gender: "female",
        isFriendly: true
    }
 */
router.post('/', verifyUser, async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { name, breed, age, gender, isFriendly } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new dog for the user
        const newDog = await Dog.create({ name, breed, age, gender, isFriendly, owner: userId });

        res.status(201).json(newDog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add dog to the user' });
    }
});

router.get('/', verifyUser, async (req, res) => {
    const { id: userId } = req.user;
    try {
        const dogs = await Dog.find({ owner: userId });
        res.status(200).json(dogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get dogs' });
    }
});

router.get('/:id', verifyUser, async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: dogId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the dog exists
        const dog = await Dog.findById(dogId);
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        res.status(200).json(dog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get dog' });
    }
});

router.put('/:id', verifyUser, async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { id: dogId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const dog = await Dog.findOneAndUpdate({ _id: dogId, owner: userId}, req.body, { new: false });
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }

        res.status(201).json(dog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update dog' });
    }
});

router.delete('/:id', verifyUser, async (req, res) => {
    try {
        await Dog.deleteOne({ _id: req.params.id, owner: req.user.id });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete dog' });
    }
});

export default router;
