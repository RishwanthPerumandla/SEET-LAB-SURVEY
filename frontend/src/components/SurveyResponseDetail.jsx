// src/components/SurveyResponseDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const SurveyResponseDetail = () => {
    const { responseId } = useParams();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const { data } = await axiosWithAuth().get(`/response/${responseId}`);
                setResponse(data);
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
                        <ListItemText primary={`Q: ${res.questionId.text}`} secondary={`Answer: ${res.answer.join(", ")}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default SurveyResponseDetail;
