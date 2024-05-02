import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosWithAuth.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/users/edit/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            await axiosWithAuth.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleAddUser = () => {
        navigate('/users/create');
    };

    return (
        <Box sx={{ mt: 4, mx: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                User Management
            </Typography>
            <Button variant="contained" onClick={handleAddUser} sx={{ mb: 2 }} color="primary">
                Add New User
            </Button>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user._id)} color="info" variant="contained">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(user._id)} color="error" variant="contained">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
