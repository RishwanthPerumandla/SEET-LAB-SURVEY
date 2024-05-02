const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['multiple_choice_single', 'multiple_choice_multiple', 'true_false', 'dropdown', 'checkboxes', 'short_answer', 'long_answer', 'date_time'], required: true },
    options: [{ text: String, isCorrect: { type: Boolean, default: false } }],
    correctAnswer: { type: String },
    placeholder: { type: String },
    dateFormat: { type: String }
});

const surveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], // Reference to questions in Question collection
    startDateTime: { type: Date },
    endDateTime: { type: Date }
});

const Survey = mongoose.model('Survey', surveySchema);
const Question = mongoose.model('Question', questionSchema);

module.exports = { Survey, Question };
