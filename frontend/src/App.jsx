// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AuthForm from './components/AuthForm';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                <NavBar />

                    <Routes>
                        <Route path="/login" element={<AuthForm />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/user" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
