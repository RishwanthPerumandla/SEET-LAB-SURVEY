const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    respondent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        answer: { type: String, required: true }
    }]
});

module.exports = mongoose.model('SurveyResponse', responseSchema)
