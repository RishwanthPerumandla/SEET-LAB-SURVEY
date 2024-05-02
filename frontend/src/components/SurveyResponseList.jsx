// src/components/SurveyResponsesList.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

const SurveyResponsesList = () => {
    const { surveyId } = useParams();
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const { data } = await axiosWithAuth.get(`/responses/${surveyId}`);
                setResponses(data);
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };
        fetchResponses();
    }, [surveyId]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" style={{ padding: 16 }}>Survey Responses</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Respondent</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {responses.map((response) => (
                        <TableRow key={response._id}>
                            <TableCell>{response.respondent ? response.respondent.name : 'Anonymous'}</TableCell>
                            <TableCell>{new Date(response.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Link to={`/response/${response._id}`}>View Details</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SurveyResponsesList;
