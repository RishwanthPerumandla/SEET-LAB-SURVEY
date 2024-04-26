// src/utils/axiosWithAuth.js
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: 'http://localhost:5000/api' // Change this to your API's base URL
});

axiosWithAuth.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosWithAuth;
