const mongoose = require('mongoose');

const responseEntrySchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer: [{ 
        type: String,  // Allows for multiple answers where necessary
        required: true
    }]
});

const responseSchema = new mongoose.Schema({
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
        required: true
    },
    respondent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Optional, based on whether you track who responds
        required: false
    },
    responses: [responseEntrySchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SurveyResponse', responseSchema);
    