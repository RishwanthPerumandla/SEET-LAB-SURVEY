// src/components/SurveyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Typography, Box, IconButton, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SurveyQuestions from './SurveyQuestions';  // Assumes SurveyQuestions is updated

const SurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    axiosWithAuth.get(`/surveys/${id}`)
      .then(response => setSurvey(response.data))
      .catch(error => console.error('Error fetching survey:', error));
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleResponsesChange = (newResponses) => {
    setResponses(newResponses);
  };

  const handleSubmitResponses = () => {
    axiosWithAuth.post(`/responses`, { surveyId: id, responses: Object.keys(responses).map(questionId => ({ questionId, answer: responses[questionId] })) })
      .then(() => alert('Responses submitted successfully'))
      .catch(error => console.error('Error submitting responses:', error));
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{survey.title}</Typography>
      </Box>
      <SurveyQuestions questions={survey.questions} onChange={handleResponsesChange} />
      <Button onClick={handleSubmitResponses} variant="contained" color="primary">Submit Responses</Button>
    </Container>
  );
};

export default SurveyDetail;
