import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import OwnersTable from '../components/OwnersTable';
export default function OwnersContainer() {
  return (
    <>
      <h2>Listado de Propietarios</h2>
      <Button to='/owners/new' variant='contained' component={Link}>
        Agregar Propietarios
      </Button>
      <OwnersTable></OwnersTable>
    </>
  );
}
