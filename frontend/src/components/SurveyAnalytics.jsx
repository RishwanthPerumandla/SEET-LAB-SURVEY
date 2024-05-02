import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
import { Paper, Typography, Button } from '@mui/material';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const SurveyAnalytics = () => {
    const { surveyId } = useParams();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await axiosWithAuth.get(`/responses/analytics/${surveyId}`);
                setAnalytics(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };
        fetchAnalytics();
    }, [surveyId]);

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Survey Analytics</Typography>
            {analytics ? (
                <div>
                    {/* Display Total Responses */}
                    <Typography>Total Responses: {analytics.totalResponses}</Typography>
                    {/* Display Chart for Question Analytics */}
                    {Object.keys(analytics.questionAnalytics).map(questionId => (
                        <div key={questionId}>
                            <Typography variant="subtitle1">Question {questionId}</Typography>
                            <VictoryChart
                                domainPadding={20}
                                width={400}
                                height={300}
                            >
                                <VictoryAxis
                                    dependentAxis
                                    tickFormat={(x) => `${x}`}
                                />
                                <VictoryAxis
                                    tickFormat={(x) => `${x}`}
                                />
                                <VictoryBar
                                    data={Object.entries(analytics.questionAnalytics[questionId]).map(([key, value]) => ({ x: key, y: value }))}
                                />
                            </VictoryChart>
                        </div>
                    ))}
                </div>
            ) : (
                <Typography>Loading...</Typography>
            )}
            <Button variant="contained" onClick={handleBack}>Back</Button>
        </Paper>
    );
};

export default SurveyAnalytics;
