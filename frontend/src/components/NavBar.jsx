// src/components/NavBar.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, userRole, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={RouterLink} to="/">Home</MenuItem>
                    {isAuthenticated && (
                        <>
                            {userRole === 'admin' && (
                                <MenuItem onClick={handleClose} component={RouterLink} to="/admin-dashboard">Admin Dashboard</MenuItem>
                            )}
                            <MenuItem onClick={handleClose} component={RouterLink} to="/user-dashboard">User Dashboard</MenuItem>
                            <MenuItem onClick={() => {
                                logout();
                                handleClose();
                            }}>Logout</MenuItem>
                        </>
                    )}
                    {!isAuthenticated && (
                        <>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/login">Login</MenuItem>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/register">Register</MenuItem>
                        </>
                    )}
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SEET Lab Platform
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
