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
  TablePagination,
} from '@mui/material';
import { useSelector } from 'react-redux';

function Reports() {
  const { reports } = useSelector((state) => state.reports);
  const { users } = useSelector((state) => state.users);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(0); // TablePagination pages are 0-based
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredReports = searchName
    ? reports.filter((report) => {
        const user = users.find(
          (user) =>
            user.id === report.reporter_id ||
            user.id === report.reported_user_id
        );
        const userNameMatch = user
          ? user.name.toLowerCase().includes(searchName.toLowerCase())
          : false;
        return userNameMatch;
      })
    : reports;
  console.log(filteredReports);

  const paginatedReports = filteredReports.slice(
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
        Reports
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

      {paginatedReports.length === 0 ? (
        <Typography variant="subtitle1" gutterBottom>
          No reviews found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reported ID</TableCell>
                  <TableCell>Reported Name</TableCell>
                  <TableCell>Reported By ID</TableCell>
                  <TableCell>Reported By Name</TableCell>
                  <TableCell>reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.reported_user_id}</TableCell>
                    <TableCell>
                      {
                        users.find((p) => p.id === report.reported_user_id)
                          ?.name
                      }
                    </TableCell>
                    <TableCell>{report.reporter_id}</TableCell>
                    <TableCell>
                      {users.find((p) => p.id === report.reporter_id)?.name}
                    </TableCell>
                    <TableCell>{report.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredReports.length}
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

export default Reports;
