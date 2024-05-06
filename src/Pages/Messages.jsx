import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getMessages } from '../store/slices/messagesSlice';
import { getUsers } from '../store/slices/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
function Messages() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { users } = useSelector((state) => state.users);
  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    if (token) {
      dispatch(getUsers());
      dispatch(getMessages());
    }
  }, [token]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Filter function
  const filteredMessages = messages.filter((message) => {
    const fromUser = users.find((u) => u.id === message.from_user_id);
    const toUser = users.find((u) => u.id === message.to_user_id);

    const matchesSearch = message.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesName =
      fromUser?.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      toUser?.name.toLowerCase().includes(nameFilter.toLowerCase());
    const isValidDateFilter = dateFilter && dayjs(dateFilter).isValid();
    const messageDate = dayjs(message?.created_at?.split('T')[0]);
    const matchesDate = isValidDateFilter
      ? messageDate.isSameOrAfter(dayjs(dateFilter))
      : true;
    return matchesSearch && matchesName && matchesDate;
  });
  console.log(filteredMessages);
  return (
    // ... inside Messages component
    <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Messages
      </Typography>
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <TextField
          label="Search Messages"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          label="Filter by User Name"
          variant="outlined"
          margin="normal"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            label="Filter by Date"
            value={dateFilter}
            onChange={(newValue) => {
              setDateFilter(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>From User ID</TableCell>
              <TableCell>From User Name</TableCell>
              <TableCell>To User ID</TableCell>
              <TableCell>To User Name</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.from_user_id}</TableCell>
                <TableCell>
                  {users.find((p) => p.id === message.from_user_id)?.name}
                </TableCell>
                <TableCell>{message.to_user_id}</TableCell>
                <TableCell>
                  {users.find((p) => p.id === message.to_user_id)?.name}
                </TableCell>
                <TableCell>{message.content}</TableCell>
                <TableCell>
                  {dayjs(message.created_at).format('DD MMMM, YYYY')}
                </TableCell>
                <TableCell>
                  {dayjs(message.updated_at).format('DD MMMM, YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Messages;
