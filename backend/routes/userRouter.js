const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {auth, checkRole} = require('../middleware/auth');  // Assuming you have authentication middleware to protect routes
const router = express.Router();
// GET the current user's profile
router.get('/profile', auth, async (req, res) => {
    // Check if the user object and _id are present
    if (!req.user || !req.user._id) {
        return res.status(400).send('User ID not found in the request');
    }

    try {
        // Fetch the user from the database excluding the password
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Send the user data excluding the password
        res.send(user);
    } catch (error) {
        console.error("Error details:", error);  // Log detailed error for troubleshooting
        res.status(500).send("An error occurred while retrieving your profile.");
    }
});

// GET all users - admin only
router.get('/', auth, checkRole('admin'), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    try {
        const users = await User.find().select('-password');  // Exclude passwords from the result
        res.send(users);
    } catch (error) {
        res.status(500).send("An error occurred while retrieving users.");
    }
});

// GET a single user by id
router.get('/:id', auth,checkRole('admin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');  // Exclude password
        if (!user) return res.status(404).send('User not found.');
        res.send(user);
    } catch (error) {
        res.status(500).send("An error occurred while retrieving the user.");
    }
});


// UPDATE a user
router.put('/:id', auth, async (req, res) => {
    // Only allow admins or the actual user to update the profile
    if (req.user._id !== req.params.id && req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            email: req.body.email,
            role: req.body.role  // Be cautious with allowing role updates
        }, { new: true }).select('-password');

        if (!user) return res.status(404).send('User not found.');
        res.send(user);
    } catch (error) {
        res.status(500).send("An error occurred while updating the user.");
    }
});

// DELETE a user
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied.');
    }
    
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found.');
        res.send(user);
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred while deleting the user.");
    }
});


module.exports = router;
