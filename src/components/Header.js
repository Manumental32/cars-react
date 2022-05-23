import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'left' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            color='primary.contrastText'
            component='div'
            sx={{ flexGrow: 2 }}
          >
            CARS
          </Typography>
          <Typography
            variant='h6'
            color='primary.contrastText'
            component='div'
            sx={{ flexGrow: 2 }}
          >
            <Link to='/owners'>Propietarios</Link>
          </Typography>
          <Typography
            variant='h6'
            color='primary.contrastText'
            component='div'
            sx={{ flexGrow: 2 }}
          >
            <Link to='/cars'>Autos</Link>
          </Typography>
          {/* <Link to='/'>Inicio</Link>
          <Link to='/cars'>Autos</Link>
          <Link to='/owners'>Propietarios</Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
