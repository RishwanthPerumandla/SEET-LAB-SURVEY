const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this path matches your file structure
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send('User already registered with this email.');
        }

        // Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user object and save to database
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role // Optional, defaults to 'user'
        });

        await user.save();

        // Optionally, return the newly created user's information (excluding password)
        const { _id, name, email, role } = user;
        res.status(201).send({ _id, name, email, role });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        // Check if the email exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare the provided password with the stored hash
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }

        // Generate a token for the user
        const token = jwt.sign(
            { _id: user._id, role: user.role }, 
            process.env.JWT_key, // Replace 'yourPrivateKey' with your actual secret key
            { expiresIn: '1h' }
        );

        // Send the token to the user
        res.send({ token, role: user.role });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
