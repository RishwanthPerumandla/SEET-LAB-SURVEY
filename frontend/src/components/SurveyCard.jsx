import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you're exporting useAuth from your AuthContext

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const handleEdit = () => {
    navigate(`/surveys/edit/${survey._id}`);
  };

  const handleViewDetails = () => {
    navigate(`/surveys/${survey._id}`); // Route to detailed survey view
  };

  const handleDelete = async () => {
    try {
      // Code for deleting survey
    } catch (error) {
      console.error('Failed to delete survey:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {survey.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
  Created by: {survey.createdBy && survey.createdBy.name ? survey.createdBy.name : "Unknown"}
</Typography>

        <Typography variant="body2" color="text.secondary">
          Start: {new Date(survey.startDateTime).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          End: {new Date(survey.endDateTime).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails} color="primary">
          View Details
        </Button>
        {userRole === 'admin' && (
          <>
            <Button size="small" onClick={handleEdit} color="primary">
              Edit
            </Button>
            <Button size="small" onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
