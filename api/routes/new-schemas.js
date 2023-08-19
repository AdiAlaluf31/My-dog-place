import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
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

export default router;
