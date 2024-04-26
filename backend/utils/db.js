const mongoose = require('mongoose');
const SurveyResponseModel = require('../models/surveyResponseModel');
const SurveyModel = require('../models/surveyModel');
const UserModel = require('../models/userModel');
// Import other models...

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const getDbInstance = (dbName) => {
    const db = mongoose.connection.useDb(dbName);

    // Register models on this db instance
    db.model('User', UserModel.schema);
    db.model('Survey', SurveyModel.schema);
    db.model('SurveyResponse', SurveyResponseModel.schema);
    // db.model('User', UserModel.schema);
    // Register other models as needed...

    return db;
};

module.exports = { connectDB, getDbInstance };
