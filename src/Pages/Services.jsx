import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteService, getServices } from '../store/slices/serviceSlice';
import {
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  Avatar,
  TableHead,
  Box,
  TableRow,
  TableCell,
  TextField,
  FormControlLabel,
  Checkbox,
  TableBody,
  Typography,
  TablePagination,
  Stack,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { services } = useSelector((state) => state.services);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const fields = services.length > 0 ? Object.keys(services[0]).filter(key => key !== 'included_services' && key !== 'optional_services') : [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        await dispatch(getServices()).unwrap();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', mb: 4 }}>
      <Typography variant="h4" gutterBottom component="div">
        Service Management
      </Typography>
      <Stack direction={'row'} gap={2}>
        <TextField
          label="Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <TextField
          label="Category"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <FormControlLabel
          sx={{ color: 'black' }}
          control={
            <Checkbox
              checked={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.checked)}
            />
          }
          label="Optional"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/services/create')}
          sx={{ mr: 1 }}
        >
          Create New Service
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="services data table">
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell
                  key={field}
                  sx={{
                    fontWeight: 'bold',
                    '& hover': { background: '#eee' },
                  }}
                >
                  {field.replace(/_/g, ' ').toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services
              .filter((service) => {
                return (
                  service.fr.toLowerCase().includes(nameFilter.toLowerCase()) &&
                  service.category
                    .toLowerCase()
                    .includes(emailFilter.toLowerCase()) &&
                  (availabilityFilter
                    ? service.optional === availabilityFilter
                    : true)
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {fields.map((field) => (
                    <TableCell key={field}>
                      {field === 'imageUrl' && service[field] ? (
                        <Avatar src={'http://wassit.biz/' + service[field]} alt={service.fr} />
                      ) : (
                        String(service[field])
                      )}
                    </TableCell>
                  ))}

                  <TableCell >
                    <Stack direction={'row'}>   <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/services/' + service.id)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => dispatch(deleteService(service.id))}
                      >
                        Delete
                      </Button></Stack>

                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={services.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default Services;
