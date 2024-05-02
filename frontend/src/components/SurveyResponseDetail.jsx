// src/components/SurveyResponseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import axiosWithAuth from './axiosWithAuth';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material'; // Import Button

const SurveyResponseDetail = () => {
    const { responseId } = useParams();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const { data } = await axiosWithAuth.get(`/responses/response/${responseId}`);
                setResponse(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching response:', error);
            }
        };
        fetchResponse();
    }, [responseId]);

    if (!response) return <div>Loading...</div>;

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Survey Response Details</Typography>
            <List>
                {response.responses.map((res, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={`Q: ${res.question ? res.question.text : 'Question not available'}`} 
                            secondary={`Answer: ${Array.isArray(res.answer) ? res.answer.join(", ") : res.answer}`} 
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="outlined" color="primary" component={Link} to="/surveys">Back</Button> {/* Back Button */}
        </Paper>
    );
};
    
export default SurveyResponseDetail;
