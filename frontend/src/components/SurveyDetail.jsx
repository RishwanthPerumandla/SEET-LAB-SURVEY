// src/components/SurveyDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Typography, Box, Grid, IconButton, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SurveyQuestions from './SurveyQuestions'; // Assuming SurveyQuestions is updated

const SurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axiosWithAuth.get(`/surveys/${id}`);
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    fetchSurvey();
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
        <Grid container alignItems="center" spacing={2}>
        <Grid item>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4">{survey.title}</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" component={Link} to={`/responses/analytics/survey/${id}`}>
              View Analytics
            </Button>
            <Button variant="outlined" component={Link} to={`/responses/${id}`}>
              View Responses
            </Button>
          </Grid>
        </Grid>
      
      </Box>
      <SurveyQuestions questions={survey.questions} onChange={handleResponsesChange} />
      <Button variant="contained" color="primary" onClick={handleSubmitResponses}>Submit Responses</Button>
      {/* <Button variant="contained" color="primary">
        <Link to={`/responses/${id}`} style={{ textDecoration: 'none', color: 'white' }}>View Responses</Link>
      </Button> */}
    </Container>
  );
};

export default SurveyDetail;
