// src/utils/axiosWithAuth.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // This will be used for navigation

const axiosWithAuth = axios.create({
    baseURL: 'http://localhost:5000/api' // Change this to your API's base URL
});

// Request Interceptor
axiosWithAuth.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response Interceptor
axiosWithAuth.interceptors.response.use(
    response => response,
    error => {
        if (error.response || error.response.status === 401) {
            // Assuming you have some kind of react router setup
            const navigate = useNavigate(); // This must be used inside a component or custom hook
            localStorage.removeItem('token'); // Clear the expired token

            // If using react-router-dom v6, you might use useNavigate instead
            navigate('/login');

            // Optionally show a notification that the user has been logged out
            alert('Your session has expired. Please log in again.');  // Or use a more sophisticated notification system
        }
        return Promise.reject(error);
    }
);

export default axiosWithAuth;
