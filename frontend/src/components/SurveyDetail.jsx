// src/components/SurveyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Typography,Box,IconButton, Container, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

// Inside your SurveyDetail component
const [isSubmitting, setIsSubmitting] = useState(false);
const [submissionSuccess, setSubmissionSuccess] = useState(false);
const [submissionError, setSubmissionError] = useState('');


  useEffect(() => {
    const fetchSurvey = async () => {
      const response = await axiosWithAuth.get(`/surveys/${id}`);
      setSurvey(response.data);
      initializeResponses(response.data.questions);
    };
    fetchSurvey();
  }, [id]);

  const handleBack = () => {
    navigate(-1);  // This will take the user back to the previous page, typically the survey list.
  };

  const initializeResponses = (questions) => {
    const initialResponses = {};
    questions.forEach(question => {
      initialResponses[question._id] = question.type === 'checkboxes' ? [] : '';
    });
    setResponses(initialResponses);
  };

  const handleChangeResponse = (questionId, optionId, type) => event => {
    const value = type === 'checkboxes' ? handleCheckboxChange(questionId, optionId) : event.target.value;
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId, optionId) => {
    const updatedOptions = responses[questionId];
    if (updatedOptions.includes(optionId)) {
      return updatedOptions.filter(item => item !== optionId);
    } else {
      return [...updatedOptions, optionId];
    }
  };

  const handleSubmitResponses = async () => {
    setIsSubmitting(true);
    setSubmissionSuccess(false);
    setSubmissionError('');

    const formattedResponses = Object.keys(responses).map(questionId => ({
        questionId,
        answer: Array.isArray(responses[questionId]) ? responses[questionId] : [responses[questionId]]
    }));

    try {
        await axiosWithAuth.post('/responses', {
            surveyId: id,
            responses: formattedResponses
        });
        setSubmissionSuccess(true);
    } catch (error) {
        console.error('Failed to submit responses:', error);
        setSubmissionError('Failed to submit responses. Please try again.');
    }
    setIsSubmitting(false);
};

  if (!survey) return <div>Loading...</div>;

  return (
    <Container>
            <Box sx={{ my: 2 }}>
        <IconButton onClick={handleBack} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ display: 'inline', marginLeft: 2 }}>
          {survey.title}
        </Typography>
      </Box>
    {!submissionSuccess ? (
      <>
        {survey.questions.map(question => (
          <Box key={question._id} sx={{ mb: 2 }}>
            <Typography variant="h6">{question.text}</Typography>
            {renderQuestionInput(question)}
          </Box>
        ))}
        <Button onClick={handleSubmitResponses} variant="contained" disabled={isSubmitting}>
          Submit Responses
        </Button>
        {isSubmitting && <Typography>Loading...</Typography>}
        {submissionError && <Typography color="error">{submissionError}</Typography>}
      </>
    ) : (
      <Typography color="primary">Responses submitted successfully!</Typography>
    )}
  </Container>
  );

  function renderQuestionInput(question) {
    switch (question.type) {
      case 'multiple_choice_single':
        return (
          <FormControl component="fieldset">
            <RadioGroup
              value={responses[question._id]}
              onChange={handleChangeResponse(question._id, null, 'radio')}
            >
              {question.options.map(option => (
                <FormControlLabel key={option._id} value={option._id} control={<Radio />} label={option.text} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 'checkboxes':
        return (
          <FormControl component="fieldset">
            {question.options.map(option => (
              <FormControlLabel
                key={option._id}
                control={
                  <Checkbox
                    checked={responses[question._id].includes(option._id)}
                    onChange={handleChangeResponse(question._id, option._id, 'checkboxes')}
                  />
                }
                label={option.text}
              />
            ))}
          </FormControl>
        );
      case 'long_answer':
        return (
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={responses[question._id]}
            onChange={handleChangeResponse(question._id, null, 'text')}
          />
        );
      default:
        return null;
    }
  }
};

export default SurveyDetail;
