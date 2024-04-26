const express = require('express');
const router = express.Router();
const Survey = require('../models/surveyModel'); // Ensure this path matches your file structure
const { auth, checkRole } = require('../middleware/auth'); // Assuming you have these middleware

// POST to create a new survey (Admin only)
// POST endpoint to create a new survey with scheduling
router.post('/', auth, checkRole('admin'), async (req, res) => {
    try {
        const survey = new Survey({
            title: req.body.title,
            createdBy: req.user._id,
            questions: req.body.questions,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime
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
        const surveys = await Survey.find().select('title createdBy startDateTime endDateTime').populate('createdBy', 'name -_id');
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
// PUT endpoint to update a survey's content and/or schedule (Admin only)
router.put('/:id', auth, checkRole('admin'), async (req, res) => {
    try {
        const updateFields = {};
        
        // Updateable fields include title, questions, startDateTime, and endDateTime
        if (req.body.title) updateFields.title = req.body.title;
        if (req.body.questions) updateFields.questions = req.body.questions;
        if (req.body.startDateTime) updateFields.startDateTime = req.body.startDateTime;
        if (req.body.endDateTime) updateFields.endDateTime = req.body.endDateTime;

        const survey = await Survey.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }
        res.send(survey);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Failed to update the survey.");
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

// Check survey availability before allowing participation
router.get('/participate/:id', auth, async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }

        const now = new Date();
        if (now < survey.startDateTime || now > survey.endDateTime) {
            return res.status(403).send('This survey is not currently active.');
        }

        res.send({ survey }); // Or render survey participation page
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while accessing the survey.");
    }
});


module.exports = router;
