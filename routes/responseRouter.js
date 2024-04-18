const express = require('express');
const router = express.Router();
const SurveyResponse = require('../models/surveyResponseModel'); // Adjust path as necessary
const Survey = require('../models/surveyModel'); // To validate survey existence
const { auth } = require('../middleware/auth'); // Assuming authentication middleware is used

// POST to submit a new survey response
router.post('/', auth, async (req, res) => {
    try {
        // Check if the survey exists
        const survey = await Survey.findById(req.body.surveyId);
        if (!survey) {
            return res.status(404).send('Survey not found.');
        }

        const surveyResponse = new SurveyResponse({
            surveyId: req.body.surveyId,
            respondent: req.user._id,  // Assuming you are tracking the respondent
            responses: req.body.responses,
            createdAt: new Date()  // Ensure the response is timestamped
        });

        await surveyResponse.save();
        res.status(201).send(surveyResponse);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while submitting the survey response.");
    }
});

// GET all responses for a specific survey
router.get('/:surveyId', auth, async (req, res) => {
    try {
        const responses = await SurveyResponse.find({ surveyId: req.params.surveyId }).populate('respondent', 'name -_id');
        if (responses.length === 0) {
            return res.status(404).send('No responses found for this survey.');
        }
        res.send(responses);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while retrieving survey responses.");
    }
});

// GET a single survey response by ID
router.get('/response/:responseId', auth, async (req, res) => {
    try {
        const response = await SurveyResponse.findById(req.params.responseId).populate('respondent', 'name -_id');
        if (!response) {
            return res.status(404).send('Response not found.');
        }
        res.send(response);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while retrieving the survey response.");
    }
});

// DELETE a survey response (Admin only)
router.delete('/response/:responseId', auth, async (req, res) => {
    try {
        // Optional: Check if the requester is an admin
        const response = await SurveyResponse.findByIdAndDelete(req.params.responseId);
        if (!response) {
            return res.status(404).send('Response not found.');
        }
        res.status(204).send(); // No content to return, but indicate success
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("An error occurred while deleting the survey response.");
    }
});

module.exports = router;
