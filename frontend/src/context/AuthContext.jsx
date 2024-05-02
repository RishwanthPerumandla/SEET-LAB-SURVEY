    // src/context/AuthContext.js
    import React, { createContext, useContext, useState, useEffect } from 'react';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [userRole, setUserRole] = useState(null);
        const [loading, setLoading] = useState(true);  // Indicates if the auth data is still loading
        const [userName, setUserName] = useState(null);  
        useEffect(() => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const username = localStorage.getItem('username');
            if (token && role) {
                setIsAuthenticated(true);
                setUserRole(role);
                setUserName(username);
            }
            setLoading(false);  // Set loading to false after checking local storage
        }, []);

        const login = (token, role, username) => {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
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
            <AuthContext.Provider value={{ isAuthenticated, userRole,setUserName, login, logout, loading }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);
