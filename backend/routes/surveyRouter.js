const express = require('express');
const router = express.Router();
const {Survey, Question} = require('../models/surveyModel'); // To validate survey existence
const { auth, checkRole } = require('../middleware/auth'); // Assuming you have these middleware
router.post('/', auth, checkRole('admin'), async (req, res) => {
    const { title, createdBy, questions, startDateTime, endDateTime } = req.body;

    try {
        // Save each question to the Question collection and collect their IDs
        const questionIds = [];
        for (const questionData of questions) {
            const newQuestion = new Question(questionData);
            const savedQuestion = await newQuestion.save();
            questionIds.push(savedQuestion._id);
        }

        // Create the new survey with the collected question IDs
        const newSurvey = new Survey({
            title,
            createdBy: req.user._id, // Assuming the creator's ID comes from authentication
            questions: questionIds, // Reference to questions in the Question collection
            startDateTime,
            endDateTime
        });

        // Save the survey
        await newSurvey.save();
        res.status(201).send(newSurvey);
    } catch (error) {
        console.error("Error creating survey:", error);
        res.status(500).send({ message: "Failed to create survey", error: error.message });
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
        // Populate the 'questions' field which refers to the 'Question' model
        const survey = await Survey.findById(req.params.id)
                                   .populate('questions');  // Corrected from 'Question' to 'questions'

        if (!survey) {
            console.log('No survey found with ID:', req.params.id);
            return res.status(404).send('Survey not found.');
        }
        
        console.log('Fetched survey with questions:', survey);
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
