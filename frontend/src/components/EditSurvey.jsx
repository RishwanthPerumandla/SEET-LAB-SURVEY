// src/components/EditSurvey.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button, TextField, Checkbox, Container, Typography, IconButton,
    MenuItem, Select, FormControl, InputLabel, Box
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axiosWithAuth from './axiosWithAuth';

const EditSurvey = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState({ title: '', questions: [] });

    useEffect(() => {
        const fetchSurvey = async () => {
            const response = await axiosWithAuth.get(`/surveys/${id}`);
            setSurvey(response.data);
        };
        fetchSurvey();
    }, [id]);

    const handleTitleChange = (event) => {
        setSurvey({ ...survey, title: event.target.value });
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...survey.questions];
        newQuestions[index][event.target.name] = event.target.value;
        setSurvey({ ...survey, questions: newQuestions });
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...survey.questions];
        newQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.value;
        setSurvey({ ...survey, questions: newQuestions });
    };

    const handleAddOption = (questionIndex) => {
        const newQuestions = [...survey.questions];
        newQuestions[questionIndex].options.push({ text: '', isCorrect: false });
        setSurvey({ ...survey, questions: newQuestions });
    };

    const handleAddQuestion = () => {
        const newQuestions = [...survey.questions, { text: '', type: 'multiple_choice_single', options: [{ text: '', isCorrect: false }] }];
        setSurvey({ ...survey, questions: newQuestions });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosWithAuth.put(`/surveys/${id}`, survey);
            navigate('/surveys');
        } catch (error) {
            console.error('Error updating survey:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography component="h1" variant="h5">Edit Survey</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Survey Title"
                    value={survey.title}
                    onChange={handleTitleChange}
                    autoFocus
                />
                {survey.questions.map((question, qIndex) => (
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
                        {question.options.map((option, oIndex) => (
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
                                        const newOptions = [...survey.questions[qIndex].options];
                                        newOptions[oIndex].isCorrect = e.target.checked;
                                        const newQuestions = [...survey.questions];
                                        newQuestions[qIndex].options = newOptions;
                                        setSurvey({ ...survey, questions: newQuestions });
                                    }}
                                />
                            </Box>
                        ))}
                        <Button onClick={() => handleAddOption(qIndex)}>Add Option</Button>
                    </Box>
                ))}
                <Button onClick={handleAddQuestion} startIcon={<AddCircleOutlineIcon />} sx={{ mt: 2 }}>
                    Add Question
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Save Changes
                </Button>
            </form>
        </Container>
    );
};

export default EditSurvey;
