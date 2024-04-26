// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect to home page or error page if not authorized
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
