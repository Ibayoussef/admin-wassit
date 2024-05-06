import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  Rating,
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';

function Reviews() {
  const { reviews } = useSelector((state) => state.reviews);
  const { users } = useSelector((state) => state.users);
  console.log(users);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0); // TablePagination pages are 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredReviews = searchName
    ? reviews.filter((review) => {
        const user = users.find(
          (user) => user.id === review.user_id || user.id === review.created_by
        );
        const userNameMatch = user
          ? user.name.toLowerCase().includes(searchName.toLowerCase())
          : false;
        return userNameMatch;
      })
    : reviews;

  const paginatedReviews = filteredReviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by User Name"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Box>

      {paginatedReviews.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom>
          No reviews found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reviewed ID</TableCell>
                  <TableCell>Reviewed Name</TableCell>
                  <TableCell>Created By ID</TableCell>
                  <TableCell>Created By Name</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.user_id}</TableCell>
                    <TableCell>
                      {users.find((p) => p.id === review.user_id)?.name}
                    </TableCell>
                    <TableCell>{review.created_by}</TableCell>
                    <TableCell>
                      {users.find((p) => p.id === review.created_by)?.name}
                    </TableCell>
                    <TableCell>{review.comment}</TableCell>
                    <TableCell>
                      <Rating
                        name="read-only"
                        value={review.score}
                        readOnly
                        precision={0.5}
                        sx={{ color: '#ffb400' }} // Set the color to yellow
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReviews.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
}

export default Reviews;
