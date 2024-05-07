import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../store/slices/usersSlice';

function CreateUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        name: '',
        phone: '',
        role: 'pro',
        password: "Password123$",
        domain: ''
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            await dispatch(createUser(user)).unwrap()
            navigate('/users'); // Navigate back to the list or dashboard
        } catch (error) {
            console.error('Failed to update service:', error);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <Paper sx={{ p: 4, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"

                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={user.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"

                    fullWidth
                    name="email"
                    label="Email"
                    type="text"
                    id="email"
                    autoComplete="current-email"
                    value={user.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="phone"
                    label="phone"
                    type="number"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="domain-label"
                        id="domain"
                        name="domain"
                        value={user.domain}
                        label="domain"
                        onChange={handleChange}
                    >
                        <MenuItem value="maid">Maid</MenuItem>
                        <MenuItem value="plombier">Plombier</MenuItem>
                        <MenuItem value="electricien">Electricien</MenuItem>
                    </Select>
                </FormControl>


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {'Create User'}
                </Button>
            </Box></Paper>
    )
}

export default CreateUser