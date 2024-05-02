// src/components/SurveyList.jsx
import React, { useEffect, useState } from 'react';
import axiosWithAuth from './axiosWithAuth';
import Grid from '@mui/material/Grid';
import SurveyCard from './SurveyCard';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axiosWithAuth.get('/surveys');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleCreateSurvey = () => {
    navigate('/surveys/create');
  };

  return (
    <Box sx={{ margin: 4 }}>
      <h1>Survey List</h1>
      {userRole === 'admin' && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateSurvey}
          sx={{ marginBottom: 2 }}
        >
          Create New Survey
        </Button>
      )}
      <Grid container spacing={2}>
        {surveys.map(survey => (
          <Grid item key={survey._id} xs={12} sm={6} md={4}>
            <SurveyCard survey={survey} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SurveyList;
