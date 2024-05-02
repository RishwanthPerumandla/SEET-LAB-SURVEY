// src/components/SurveyQuestions.jsx
import React, { useState } from 'react';
import { Typography, Paper, List, ListItem, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, TextField } from '@mui/material';

const SurveyQuestions = ({ questions, onChange }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    onChange(updatedAnswers);  // Send answers up to parent component
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Survey Questions</Typography>
      <List>
        {questions.map(question => (
          <ListItem key={question._id} sx={{ mb: 2 }}>
            <FormControl component="fieldset" fullWidth>
              <Typography>{question.text}</Typography>
              {question.type === 'multiple_choice_single' && (
                <RadioGroup
                  name={`question_${question._id}`}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                >
                  {question.options.map(option => (
                    <FormControlLabel key={option._id} value={option._id} control={<Radio />} label={option.text} />
                  ))}
                </RadioGroup>
              )}
              {question.type === 'checkboxes' && (
                question.options.map(option => (
                  <FormControlLabel
                    key={option._id}
                    control={
                      <Checkbox
                          onChange={(e) => {
                          const currentAnswers = answers[question._id] || [];
                          handleAnswerChange(question._id, e.target.checked
                            ? [...currentAnswers, option._id]
                            : currentAnswers.filter(id => id !== option._id))
                        }}
                      />
                    }
                    label={option.text}
                  />
                ))
              )}
              {question.type === 'long_answer' && (
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={answers[question._id] || ''}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                />
              )}
            </FormControl>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SurveyQuestions;
