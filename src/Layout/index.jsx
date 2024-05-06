import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { getUsers } from '../store/slices/usersSlice';
import { getFormData } from '../store/slices/questionsSlice';
import { getRequests } from '../store/slices/requestsSlice';
import { getReceipts } from '../store/slices/receiptSlice';
import { useDispatch } from 'react-redux';
import { getReviews } from '../store/slices/reviewSlice';
import { getReports } from '../store/slices/reportSlice';
function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    if (token) {
      dispatch(getUsers());
      dispatch(getFormData());
      dispatch(getRequests());
      dispatch(getReceipts());
      dispatch(getReviews());
      dispatch(getReports());
    }
  }, [token]);
  return (
    <div>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
