const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false } // Useful for multiple correct choices
});

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['multiple_choice_single', 'multiple_choice_multiple', 'true_false', 'dropdown', 'checkboxes', 'short_answer', 'long_answer', 'date_time'], 
        required: true 
    },
    options: [optionSchema], // Used for multiple choice, dropdown, checkboxes
    correctAnswer: String, // Used for true/false, multiple choice with a single correct answer
    minRating: Number, // Could be repurposed for future needs like a rating scale
    maxRating: Number,
    placeholder: String, // Placeholder text for short and long answer types
    dateFormat: String // To specify the format for date & time questions
});

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [questionSchema]
});

module.exports = mongoose.model('Survey', surveySchema);
