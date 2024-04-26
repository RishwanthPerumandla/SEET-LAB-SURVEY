// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    userRole: null,
    setIsAuthenticated: () => {},
    setUserRole: () => {},
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsAuthenticated(!!token);
        setUserRole(role);
    }, []);

    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
