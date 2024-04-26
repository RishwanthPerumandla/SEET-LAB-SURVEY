const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },  // Assuming this field is optional since it doesn't have `required: true`
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
