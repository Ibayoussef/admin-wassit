import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers as getUsersAction } from '../store/slices/usersSlice';
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

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const fields = users.length > 0 ? Object.keys(users[0]) : [];

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
    const fetchUsers = async () => {
      setLoading(true);
      try {
        await dispatch(getUsersAction()).unwrap();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
      <Stack direction={'row'} gap={2}><Typography variant="h4" gutterBottom component="div">
        User Management
      </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/pro/create')}
          sx={{ mr: 1 }}
        >
          Create New Pro User
        </Button>
      </Stack>

      <Stack direction={'row'} gap={2}>
        {' '}
        <TextField
          label="Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <TextField
          label="Email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <TextField
          label="Phone"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />
        <TextField
          label="Address"
          value={addressFilter}
          onChange={(e) => setAddressFilter(e.target.value)}
        />
        <TextField
          label="Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        />
        <FormControlLabel
          sx={{ color: 'black' }}
          control={
            <Checkbox
              checked={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.checked)}
            />
          }
          label="Available"
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users data table">
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
            {users
              .filter((user) => {
                return (
                  user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                  user.email
                    .toLowerCase()
                    .includes(emailFilter.toLowerCase()) &&
                  user.phone.includes(phoneFilter) &&
                  user.address
                    .toLowerCase()
                    .includes(addressFilter.toLowerCase()) &&
                  user.role.toLowerCase().includes(roleFilter.toLowerCase()) &&
                  (availabilityFilter
                    ? user.available === availabilityFilter
                    : true)
                );
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {fields.map((field) => (
                    <TableCell key={field}>
                      {field === 'profile_picture' && user[field] ? (
                        <Avatar src={user[field]} alt={user.name} />
                      ) : (
                        String(user[field])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default Users;
