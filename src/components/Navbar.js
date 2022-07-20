import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              Keeper App
            </Typography>
          </Toolbar>
        </AppBar>
  )
}

export default Navbar