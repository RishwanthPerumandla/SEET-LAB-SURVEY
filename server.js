// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
// Import routers
const userRouter = require('./routes/userRouter');
const surveyRouter = require('./routes/surveyRouter');
const responseRouter = require('./routes/responseRouter');
const authRouter = require('./routes/authRouter');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/seetlab')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Routes
app.use('/api/users', userRouter);
app.use('/api/surveys', surveyRouter);
// app.use('/api/responses', responseRouter);
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
