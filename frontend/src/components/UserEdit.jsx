import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axiosWithAuth from './axiosWithAuth';

const UserEdit = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: '',
        password: ''
    });

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await axiosWithAuth.get(`/users/${userId}`);
                    const { username, email, role } = response.data;
                    setUser({ username, email, role });
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            };
            fetchUser();
        }
    }, [userId]);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { ...user };
        if (!userId) {
            userData.password = user.password;  // Include password only for new user creation
        }

        try {
            if (userId) {
                await axiosWithAuth.put(`/users/${userId}`, userData);
            } else {
                await axiosWithAuth.post('/users', userData);
            }
            navigate('/users');
        } catch (error) {
            console.error('Failed to save user:', error);
        }
    };

    return (
        <Container>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1 } }}>
                <TextField label="UserName" name="username" value={user.username} onChange={handleChange} fullWidth required />
                <TextField label="Email" name="email" type="email" value={user.email} onChange={handleChange} fullWidth required />
                <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select name="role" value={user.role} onChange={handleChange} required>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        {/* <MenuItem value="moderator">Moderator</MenuItem> */}
                    </Select>
                </FormControl>
                {!userId && (
                    <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} fullWidth required />
                )}
                <Button type="submit" color="primary" variant="contained" fullWidth>{userId ? 'Update User' : 'Create User'}</Button>
            </Box>
        </Container>
    );
};

export default UserEdit;
