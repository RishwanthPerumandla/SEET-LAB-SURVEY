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
import Sidebar from './components/SideBar';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                {/* <NavBar /> */}
        <Sidebar />
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
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
