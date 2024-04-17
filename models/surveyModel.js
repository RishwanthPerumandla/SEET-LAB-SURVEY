const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{
        text: { type: String, required: true },
        type: { type: String, enum: ['multiple_choice', 'true_false'], required: true },
        options: [{ text: String }],
        correctAnswer: { type: String }
    }]
});

module.exports = mongoose.Model('Survey', surveySchema)

