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
  Typography,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { updateRequest } from '../store/slices/requestsSlice';

function Requests() {
  const { requests } = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const handleValidate = (id) => {
    console.log('Validate:', id);
    const data = { requestId: id, status: { status: 'validated' } };
    dispatch(updateRequest(data));
  };

  const handleDecline = (id) => {
    console.log('Decline:', id);
    const data = { requestId: id, status: { status: 'declined' } };
    dispatch(updateRequest(data));
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pro User Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom>
          No new requests.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>ID Photo</TableCell>
                <TableCell>Selfie</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.user_id}</TableCell>
                  <TableCell>
                    <a
                      href={'http://localhost:4000/storage/' + request.id_photo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View ID Photo
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={'http://localhost:4000/storage/' + request.selfie}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Selfie
                    </a>
                  </TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleValidate(request.id)}
                      sx={{ mr: 1 }}
                    >
                      Validate
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDecline(request.id)}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Requests;
