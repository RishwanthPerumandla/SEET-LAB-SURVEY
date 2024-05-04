// src/components/SurveyResponseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const SurveyResponseDetail = () => {
    const { responseId } = useParams();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const { data } = await axiosWithAuth.get(`/responses/response/${responseId}`);
                setResponse(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching response:', error);
                setError('Failed to fetch response. Please try again later.');
                setIsLoading(false);
            }
        };
        fetchResponse();
    }, [responseId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Survey Response Details</Typography>
            <List>
                {response.responses.map((res, index) => (
                    <ListItem key={index} divider>
                        <ListItemText 
                            primary={`Q: ${res.questionText}`} 
                            secondary={`Answer: ${typeof res.answers === 'string' ? res.answers : res.answers.join(", ")}`} 
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" component={Link} to="/surveys" style={{ marginTop: '20px' }}>
                Back to Surveys
            </Button>
        </Paper>
    );
};

export default SurveyResponseDetail;
