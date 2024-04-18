// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module
require('dotenv').config()
// Import routers
const userRouter = require('./routes/userRouter');
const surveyRouter = require('./routes/surveyRouter');
const responseRouter = require('./routes/responseRouter');
const authRouter = require('./routes/authRouter');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// CORS options
const corsOptions = {
    origin: 'http://127.0.0.1:5173', // Allow only this origin to access
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with options
app.use(cors(corsOptions));


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
app.use('/api/responses', responseRouter);
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
