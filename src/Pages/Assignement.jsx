import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, assignProject } from '../store/slices/projectsSlice';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Select,
    MenuItem,
    Typography,
    CircularProgress
} from '@mui/material';
import { getUsers } from '../store/slices/usersSlice';

const Assignement = () => {
    const dispatch = useDispatch();
    const { projects, loading: projectsLoading } = useSelector(state => state.projects);
    const { users } = useSelector(state => state.users);
    const [selectedPros, setSelectedPros] = useState({});

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getUsers());
    }, [dispatch]);

    const handleSelectPro = (projectId, proId) => {
        setSelectedPros(prev => ({ ...prev, [projectId]: proId }));
    };

    const handleAssignPro = (projectId) => {
        const proId = selectedPros[projectId];
        dispatch(assignProject({ id: projectId, proId })).then(() => {
            dispatch(getProjects());
            dispatch(getUsers());
        });
    };

    if (projectsLoading) return <CircularProgress />;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Assign Professionals to Projects
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Assigned Pro</TableCell>
                            <TableCell>Assign Pro</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project?.pros?.[0]?.name ?? 'None'}</TableCell>
                                <TableCell>
                                    <Select
                                        value={selectedPros[project.id] || ''}
                                        onChange={(e) => handleSelectPro(project.id, e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {users?.filter(p => p.role === 'pro')?.map((pro) => (
                                            <MenuItem key={pro.id} value={pro.id}>{pro.name}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAssignPro(project.id)}
                                        disabled={!selectedPros[project.id]}
                                    >
                                        Assign
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

export default Assignement;
