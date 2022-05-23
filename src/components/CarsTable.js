import React, { useState } from 'react';
import { useEffect } from 'react';
import CarService from './../services/CarService';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CarsTable() {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialData = async () => {
    try {
      const response = await CarService.getCars();
      setCars(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'brand', headerName: 'Marca', width: 130 },
    { field: 'model', headerName: 'Modelo', width: 130 },
    { field: 'licensePlate', headerName: 'Patente', width: 130 },
    { field: 'color', headerName: 'Color', width: 130 },
    {
      field: 'owners',
      headerName: 'Propietarios',
      width: 130,
      renderCell: (params) => {
        return (
          <span>{`${params?.value[0]?.firstname} ${params?.value[0]?.lastname}`}</span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 260,
      renderCell: (params) => {
        const handlerDelete = (e) => {
          e.preventDefault();
          if (window.confirm('¿Estas seguro?')) {
            deleteCar(params.id);
          }
        };
        const editButton = (
          <Button
            to={'/cars/' + params.id}
            variant='contained'
            component={Link}
          >
            Editar
          </Button>
        );
        const deleteButton = <Button onClick={handlerDelete}>Eliminar</Button>;
        return (
          <>
            {editButton} {deleteButton}
          </>
        );
      },
    },
  ];

  const deleteCar = async (id) => {
    try {
      const response = await CarService.deleteCar(id);
      if (!response) {
        return false;
      }
      getInitialData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {cars && (
        <DataGrid
          rows={cars}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
}
