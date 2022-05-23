import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CarsTable from '../components/CarsTable';

export default function CarsContainer() {
  return (
    <>
      <h2>Listado de autos</h2>
      <Button to='/cars/new' variant='contained' component={Link}>
        Agregar Auto
      </Button>
      <CarsTable></CarsTable>
    </>
  );
}
