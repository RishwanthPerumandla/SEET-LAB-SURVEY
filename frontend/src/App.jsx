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
import SurveyList from './components/SurveyList';
import CreateSurvey from './components/CreateSurvey';
import EditSurvey from './components/EditSurvey';
import SurveyDetail from './components/SurveyDetail';
const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                <NavBar />

                    <Routes>
                        <Route path="/login" element={<AuthForm />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/surveys" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>    
                        
                        <SurveyList />
                        </ProtectedRoute>    
                        
                        } />
                        <Route path="/surveys/:id" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>    
                                <SurveyDetail/>
                        </ProtectedRoute>
                    } />

                        <Route path="/surveys/create" element={<CreateSurvey />} />
                         <Route path="/surveys/edit/:id" element={<EditSurvey />} />
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
