import React, { useState } from 'react';
import { useEffect } from 'react';
import OwnerService from '../services/OwnerService';
import { DataGrid } from '@mui/x-data-grid';

export default function OwnersTable() {
  const [owners, setOwners] = useState(null);
  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialData = async () => {
    try {
      const response = await OwnerService.getOwners();
      setOwners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstname', headerName: 'Nombre', width: 130 },
    { field: 'lastname', headerName: 'Apellido', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {owners && (
        <DataGrid
          rows={owners}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
}
