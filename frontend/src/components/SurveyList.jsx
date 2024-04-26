// Example of using axiosWithAuth in a component
import React, { useEffect, useState } from 'react';
import axiosWithAuth from './axiosWithAuth';
import Grid from '@mui/material/Grid';
import SurveyCard from './SurveyCard';
const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axiosWithAuth.get('/surveys');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        // Handle errors here, e.g., redirect to login if unauthorized
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Survey List</h1>
      <Grid container spacing={2}>
      {surveys.map(survey => (
        <Grid item key={survey._id} xs={12} sm={6} md={4}>
          <SurveyCard survey={survey} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default SurveyList;
