// src/components/Dashboard..jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Adjust path as necessary

const Dashboard = () => {
    const navigate = useNavigate();
    const { userRole, userName } = useAuth(); // Fetching userName from AuthContext

    return (
        <Container>
            <Typography variant="h2" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                Welcome to the SEET Lab Survey Platform
            </Typography>
            {userName && (
                <Typography variant="h4" sx={{ mt: 1, textAlign: 'center' }}>
                    Hi {userName}
                </Typography>
            )}
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ '& button': { mt: 2 } }}>
                <Button variant="contained" onClick={() => navigate('/surveys')}>
                    View Surveys
                </Button>
                {userRole === 'admin' && (
                    <>
                        <Button variant="contained" onClick={() => navigate('/users')}>
                            Manage Users
                        </Button>
                        <Button variant="contained" onClick={() => navigate('/create-survey')}>
                            Create Survey
                        </Button>
                    </>
                )}
                <Button variant="contained" onClick={() => navigate('/responses')}>
                    View Responses
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
