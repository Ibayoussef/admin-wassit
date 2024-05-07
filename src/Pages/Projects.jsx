import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../store/slices/projectsSlice';
import {
    CircularProgress,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    TableBody,
    Typography,
    TablePagination,
    Box,
    Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function Projects() {
    const dispatch = useDispatch();
    const { projects, loading } = useSelector(state => state.projects);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [scheduledDateFilter, setScheduledDateFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const filteredProjects = projects.filter(project => {
        const scheduledDateMatch = scheduledDateFilter ? new Date(project.scheduled_date).toLocaleDateString() === new Date(scheduledDateFilter).toLocaleDateString() : true;
        return (
            project.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            project.category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
            project.status.toLowerCase().includes(statusFilter.toLowerCase()) &&
            scheduledDateMatch
        );
    });

    return (
        <Box sx={{ maxWidth: 1000, margin: 'auto', mb: 4 }}>
            <Typography variant="h4" gutterBottom component="div">
                Project Management
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction={'row'} gap={2}>   <TextField
                    label="Filter by Name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}

                    margin="normal"
                />
                    <TextField
                        label="Filter by Category"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}

                        margin="normal"
                    />
                    <TextField
                        label="Filter by Status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}

                        margin="normal"
                    />

                    <DatePicker
                        label="Filter by Scheduled Date"
                        value={scheduledDateFilter}
                        onChange={(newValue) => {
                            setScheduledDateFilter(newValue);
                        }}
                        sx={{ mt: 2 }}
                        renderInput={(params) => <TextField {...params} />}
                    />

                </Stack>
            </LocalizationProvider>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="projects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Assigned Pro</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Scheduled Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProjects
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.pros?.[0]?.email ?? 'N/A'}</TableCell>
                                    <TableCell>{project.category}</TableCell>
                                    <TableCell>{project.status}</TableCell>
                                    <TableCell>{project.price}dhs</TableCell>
                                    <TableCell>{project.scheduled_date ? new Date(project.scheduled_date).toLocaleDateString() : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProjects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
}

export default Projects;
