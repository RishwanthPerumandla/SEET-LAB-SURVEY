// src/components/CreateSurvey.jsx
import React, { useState } from 'react';
import { Button, TextField, Checkbox, Container, Typography, IconButton, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useParams,useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', type: 'multiple_choice_single', options: [{ text: '', isCorrect: false }] }
    ]);
    const [startDateTime, setStartDateTime] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD format
    const [endDateTime, setEndDateTime] = useState(new Date().toISOString().slice(0, 10));
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push({ text: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', type: 'multiple_choice_single', options: [{ text: '', isCorrect: false }] }]);
    };
    const handleBack = () => {
      navigate(-1);  // This will take the user back to the previous page, typically the survey list.
    };
  

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          
            await axiosWithAuth.post('/surveys', { title, questions, startDateTime, endDateTime });
            navigate('/surveys');
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
          <Box sx={{ my: 2 }}>
        <IconButton onClick={handleBack} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ display: 'inline', marginLeft: 2 }}>
        Create New Survey        </Typography>
      </Box>
            {/* <Typography component="h1" variant="h5"></Typography> */}
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Survey Title"
                    value={title}
                    onChange={handleTitleChange}
                    autoFocus
                />
                {questions.map((question, qIndex) => (
                    <Box key={qIndex} sx={{ mb: 2 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Question Text"
                            name="text"
                            value={question.text}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                name="type"
                                value={question.type}
                                label="Type"
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                            >
                                <MenuItem value="multiple_choice_single">Multiple Choice - Single Answer</MenuItem>
                                <MenuItem value="checkboxes">Checkboxes - Multiple Answers</MenuItem>
                                <MenuItem value="long_answer">Long Answer</MenuItem>
                            </Select>
                        </FormControl>
                        {question.options && question.options.map((option, oIndex) => (
                            <Box key={oIndex} display="flex" alignItems="center" mt={2}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Option Text"
                                    name="text"
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                />
                                <Checkbox
                                    checked={option.isCorrect}
                                    onChange={(e) => {
                                        const newOptions = [...questions[qIndex].options];
                                        newOptions[oIndex].isCorrect = e.target.checked;
                                        const newQuestions = [...questions];
                                        newQuestions[qIndex].options = newOptions;
                                        setQuestions(newQuestions);
                                    }}
                                />
                            </Box>
                        ))}
                        {question.type !== 'long_answer' && (
                            <Button onClick={() => handleAddOption(qIndex)}>Add Option</Button>
                        )}
                    </Box>
                ))}
                <Button onClick={handleAddQuestion} startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2 }}>
                    Add Question
                </Button>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Survey
                </Button>
            </form>
        </Container>
    );
};

export default CreateSurvey;
