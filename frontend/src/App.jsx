// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import Sidebar from './components/SideBar';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import Dashboard from './components/Dashboard';
import SurveyResponsesList from './components/SurveyResponseList';
import SurveyResponseDetail from './components/SurveyResponseDetail';
import SurveyAnalytics from './components/SurveyAnalytics';

const App = () => {
    const { isAuthenticated } = useAuth(); // Get isAuthenticated from useAuth
    
    if (isAuthenticated === undefined) {
        // Return loading state or placeholder while authentication context is initializing
        return <div>Loading...</div>;
    }
    return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                {/* <NavBar /> */}
                {isAuthenticated && <Sidebar />} {/* Render Sidebar only when isAuthenticated */}

                    {/*     const { isAuthenticated } = useAuth(); // Get isAuthenticated from useAuth */}
                    <Routes> 
                        <Route path="/login" element={<AuthForm />} />
                        {/* <Route path="/" element={<Home />} /> */}
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

                        <Route path="/surveys/create" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <CreateSurvey />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/surveys/edit/:id" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <EditSurvey />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/users/" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <UserList />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/users/create" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <UserEdit  />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/users/edit/:userId" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <UserEdit  />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/surveys/edit/:id" element={
                         <ProtectedRoute allowedRoles={['admin']}>    
                            <EditSurvey />                 
                        </ProtectedRoute>
                        } />
                        <Route path="/" element={
                            <ProtectedRoute allowedRoles={['admin','user']}>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/user" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/responses/:surveyId" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <SurveyResponsesList />
                            </ProtectedRoute>
                        } />
                        <Route path="/response/:responseId" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <SurveyResponseDetail />
                            </ProtectedRoute>
                        } />
                        <Route path="/responses/analytics/survey/:surveyId" element={
                            <ProtectedRoute allowedRoles={['user', 'admin']}>
                                <SurveyAnalytics />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
    );
};

export default App;
