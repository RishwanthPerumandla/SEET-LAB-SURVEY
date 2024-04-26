// src/components/NavBar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function NavBar() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/logout">Logout</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;
