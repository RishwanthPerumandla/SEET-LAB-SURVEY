import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography, Container, Tab, Tabs, Box, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import CollegeLogo from '../assets/logo.png'; // Importing college logo image

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
            login(response.data.token, response.data.role, response.data.username);
            if(response.data.role ==="user"){
                navigate('/');
            }else{
                navigate('/');
            }
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <img src={CollegeLogo} alt="College Logo" style={{ width: '100%',marginRight: '16px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                    <Typography component="h1" variant="h5">
                        {isLogin ? 'Login' : 'Register'}
                    </Typography>
                </Box>
                <Tabs value={isLogin ? 0 : 1} onChange={() => setIsLogin(!isLogin)} aria-label="Login or Register">
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
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
            </Paper>
        </Container>
    );
}

export default AuthForm;
