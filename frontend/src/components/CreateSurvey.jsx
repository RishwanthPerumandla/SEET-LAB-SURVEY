import React, { useState } from 'react';
import { Button, TextField, Checkbox, Container, Typography, IconButton, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Box, Grid, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateSurvey = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ text: '', type: 'multiple_choice_single', options: [{ text: '', isCorrect: false }] }]);
    const [startDateTime, setStartDateTime] = useState(getFormattedDate(new Date()));
    const [endDateTime, setEndDateTime] = useState(getFormattedDate(new Date()));

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', type: 'multiple_choice_single', options: [{ text: '', isCorrect: false }] }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setQuestions(newQuestions);
    };

    const handleAddOption = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].options.push({ text: '', isCorrect: false });
        setQuestions(newQuestions);
    };
    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex].text = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!title || !startDateTime || !endDateTime) {
            console.error('Please fill out all required fields.');
            return;
        }

        const survey = {
            title,
            createdBy: 'User ID from Auth Context', // This should be replaced with the actual user ID from context/state
            questions,
            startDateTime,
            endDateTime
        };

        try {
            await axiosWithAuth.post('/surveys', survey);
            navigate('/surveys');
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    // Function to format date in YYYY-MM-DD format
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
                <IconButton onClick={() => navigate(-1)} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ mb: 2 }}>Create New Survey</Typography>
                <TextField
                    fullWidth
                    label="Survey Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                {questions.map((question, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        <TextField
                            fullWidth
                            label="Question Text"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={question.type}
                                label="Type"
                                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                            >
                                <MenuItem value="multiple_choice_single">Multiple Choice - Single Answer</MenuItem>
                                <MenuItem value="checkboxes">Checkboxes - Multiple Answers</MenuItem>
                                <MenuItem value="long_answer">Long Answer</MenuItem>
                            </Select>
                        </FormControl>
                        {question.options.map((option, oIndex) => (
                            <Box key={oIndex} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Option Text"
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                    variant="outlined"
                                    sx={{ mr: 2 }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={option.isCorrect}
                                            onChange={(e) => {
                                                const newOptions = [...questions[index].options];
                                                newOptions[oIndex].isCorrect = e.target.checked;
                                                const newQuestions = [...questions];
                                                newQuestions[index].options = newOptions;
                                                setQuestions(newQuestions);
                                            }}
                                        />
                                    }
                                    label="Correct"
                                />
                            </Box>
                        ))}
                        {question.type !== 'long_answer' && (
                            <Button onClick={() => handleAddOption(index)} startIcon={<AddCircleOutlineIcon />} sx={{ mt: 1 }}>
                                Add Option
                            </Button>
                        )}
                    </Box>
                ))}
                <Button onClick={handleAddQuestion} startIcon={<AddCircleOutlineIcon />} sx={{ mt: 1 }}>
                    Add Question
                </Button>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            value={startDateTime}
                            onChange={(e) => setStartDateTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            value={endDateTime}
                            onChange={(e) => setEndDateTime(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    Create Survey
                </Button>
            </Paper>
        </Container>
    );
};

export default CreateSurvey;
