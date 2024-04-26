// src/components/SurveyCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/surveys/${survey._id}`); // Route to detailed survey view
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {survey.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created by: {survey.createdBy.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start: {new Date(survey.startDateTime).toLocaleDateString()} at {new Date(survey.startDateTime).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          End: {new Date(survey.endDateTime).toLocaleDateString()} at {new Date(survey.endDateTime).toLocaleTimeString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
