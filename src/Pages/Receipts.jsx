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
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';

function Receipts() {
  const { receipts } = useSelector((state) => state.receipts);
  const { users } = useSelector((state) => state.users);

  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [page, setPage] = useState(0); // TablePagination pages are 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredReceipts =
    searchName || searchCode
      ? receipts.filter((receipt) => {
          const user = users.find((user) => user.id === receipt.user_id);
          const userNameMatch = user
            ? user.name.toLowerCase().includes(searchName.toLowerCase())
            : false;
          const codeMatch = receipt.solopreneur_code
            .toLowerCase()
            .includes(searchCode.toLowerCase());
          return userNameMatch && codeMatch;
        })
      : receipts;

  const paginatedReceipts = filteredReceipts.slice(
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
        Pro User Receipts
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by User Name"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <TextField
          label="Search by Solopreneur Code"
          variant="outlined"
          size="small"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
      </Box>

      {paginatedReceipts.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom>
          No receipts found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Receipt</TableCell>
                  <TableCell>Solopreneur Code</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell>{receipt.user_id}</TableCell>
                    <TableCell>
                      {users.find((p) => p.id === receipt.user_id)?.name}
                    </TableCell>
                    <TableCell>
                      <a
                        href={receipt.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Receipt
                      </a>
                    </TableCell>
                    <TableCell>{receipt.solopreneur_code}</TableCell>
                    <TableCell>{receipt.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReceipts.length}
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

export default Receipts;
