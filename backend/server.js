// Import and configure the necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Import routers
const userRouter = require('./routes/userRouter');
const surveyRouter = require('./routes/surveyRouter');
const responseRouter = require('./routes/responseRouter');
const authRouter = require('./routes/authRouter');

// Routes
app.use('/api/users', userRouter);
app.use('/api/surveys', surveyRouter);
app.use('/api/responses', responseRouter);
app.use('/api/auth', authRouter);

// Export the app for testing
module.exports = app;
