import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import logo from '../assets/logo.svg'; // Make sure the path is correct
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  };

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#ffe' }}
      position="relative"
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="logo" width={50} /> {/* Logo on the left side */}
        </Box>
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleLogout}
          sx={{ ml: 'auto', color: 'black' }}
        >
          <LogoutIcon fill="black" /> {/* Logout button on the right side */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
