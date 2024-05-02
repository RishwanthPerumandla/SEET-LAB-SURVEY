// src/components/SurveyCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assuming you're exporting useAuth from your AuthContext

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const { userRole } = useAuth();
  const handleDelete = () => {
    // Open confirmation dialog
    setOpen(true);
  };
  const handleEdit = () => {
    navigate(`/surveys/edit/${survey._id}`);
  };

  const handleViewDetails = () => {
    navigate(`/surveys/${survey._id}`); // Route to detailed survey view
  };
  const confirmDelete = async () => {
    try {
      await axiosWithAuth.delete(`/surveys/${survey._id}`);
      navigate('/surveys'); // refresh the list or handle the update visually in your state
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete survey:', error);
      // Optionally show an error message to the user
    }
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
