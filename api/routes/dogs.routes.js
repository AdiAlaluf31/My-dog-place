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
        // req.user = { id: "123", isAdmin: false, iat: 123123123 }
        const { id: userId } = req.user;
        const { name, breed, age, gender, isFriendly } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new dog for the user
        const newDog = await Dog.create({ name, breed, age, gender, isFriendly, owner: userId });

        // Add the dog to the user's dogs array
        user.dogs.push(newDog._id);
        await user.save();

        res.status(201).json(newDog);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add dog to the user' });
    }
});

export default router;
