const express = require('express');
const router = express.Router();
const Survey = require('../models/surveyModel'); // Ensure this path matches your file structure
const { auth, checkRole } = require('../middleware/auth'); // Assuming you have these middleware

// POST to create a new survey (Admin only)
router.post('/', auth, checkRole('admin'), async (req, res) => {
    try {
        const survey = new Survey({
            title: req.body.title,
            createdBy: req.user._id,
            questions: req.body.questions
        });
        await survey.save();
        res.status(201).send(survey);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while creating the survey.");
    }
});

// GET all surveys
router.get('/', auth, async (req, res) => {
    try {
        const surveys = await Survey.find().populate('createdBy', 'name -_id');
        res.send(surveys);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while retrieving surveys.");
    }
});

// GET a specific survey by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id).populate('createdBy', 'name -_id');
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }
        res.send(survey);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while retrieving the survey.");
    }
});

// PUT to update a survey (Admin only)
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
    try {
        const survey = await Survey.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            questions: req.body.questions
        }, { new: true });
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }
        res.send(survey);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while updating the survey.");
    }
});

// DELETE a survey (Admin only)
router.delete('/:id', auth, checkRole('admin'), async (req, res) => {
    try {
        const survey = await Survey.findByIdAndDelete(req.params.id);
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }
        res.status(204).send(); // No content to return, but indicate success
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while deleting the survey.");
    }
});

module.exports = router;
