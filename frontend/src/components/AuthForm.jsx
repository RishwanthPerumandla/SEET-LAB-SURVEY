// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography, Container, Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''  // Initialize role
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isLogin ? 'login' : 'register';
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData);
            login(response.data.token, response.data.role);
            if(response.data.role ==="user"){
                navigate('/user');
            }else{
                navigate('/admin');
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} aria-label="Login or Register">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <Typography component="h1" variant="h5">
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {!isLogin && (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    label="Role"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    {/* Add more roles as needed */}
                                </Select>
                            </FormControl>
                        </>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AuthForm;
