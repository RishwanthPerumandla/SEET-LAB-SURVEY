// src/hooks/useAxiosWithAuth.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const useAxiosWithAuth = () => {
    const navigate = useNavigate();

    // useMemo ensures that the axios instance is memoized and not recreated on every render.
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:3000/api' // Change this to your API's base URL
        });

        instance.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        instance.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token'); // Clear the expired token
                    
                    navigate('/login');
                    // Optionally show a notification that the user has been logged out
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [navigate]);

    return axiosInstance;
};
