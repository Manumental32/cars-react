import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import CarService from '../services/CarService';
import OwnerService from '../services/OwnerService';

export default function CarForm() {
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

  const initialValuesForm = {
    brand: '',
    model: '',
    licensePlate: '',
    color: '',
    owner: '',
  };

  const schemaForm = Yup.object().shape({
    brand: Yup.string().required('Campo requerido'),
    model: Yup.string().required('Campo requerido'),
    licensePlate: Yup.string().required('Campo requerido'),
    color: Yup.string().required('Campo requerido'),
  });

  const onSubmitForm = async (values) => {
    try {
      const response = await CarService.createCar(values);
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlerOnChangeOwnerSelect = (e, setFieldValue) => {
    const ownerIdSelected = e.target.value;
    const ownerSelected = owners.find((owner) => (owner.id = ownerIdSelected));
    setFieldValue('owner', ownerSelected);
  };

  return (
    <>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={onSubmitForm}
        validationSchema={schemaForm}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;
          return (
            <Form noValidate onSubmit={handleSubmit} autoComplete='off'>
              <Container maxWidth='sm'>
                <h3>Auto creación</h3>
                <TextField
                  variant='standard'
                  fullWidth
                  label='Marca'
                  placeholder='Marca'
                  id='brand'
                  name='brand'
                  autoComplete='brand'
                  inputProps={{ autoCorrect: 'off', autoCapitalize: 'none' }}
                  value={values.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.brand && touched.brand}
                  helperText={errors.brand && touched.brand ? errors.brand : ''}
                />
                <TextField
                  variant='standard'
                  fullWidth
                  label='Modelo'
                  placeholder='Modelo'
                  id='model'
                  name='model'
                  autoComplete='model'
                  value={values.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.model && touched.model}
                  helperText={errors.model && touched.model ? errors.model : ''}
                />
                <TextField
                  variant='standard'
                  fullWidth
                  label='Patente'
                  placeholder='Patente'
                  id='licensePlate'
                  name='licensePlate'
                  autoComplete='licensePlate'
                  value={values.licensePlate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.licensePlate && touched.licensePlate}
                  helperText={
                    errors.licensePlate && touched.licensePlate
                      ? errors.licensePlate
                      : ''
                  }
                />
                <TextField
                  variant='standard'
                  fullWidth
                  label='Color'
                  placeholder='Color'
                  id='color'
                  name='color'
                  autoComplete='color'
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.color && touched.color}
                  helperText={errors.color && touched.color ? errors.color : ''}
                />
                <TextField
                  variant='standard'
                  fullWidth
                  label='Propietario'
                  placeholder='Propietario'
                  id='owner'
                  name='owner'
                  autoComplete='owner'
                  value={values.owner}
                  onChange={(e) => handlerOnChangeOwnerSelect(e, setFieldValue)}
                  onBlur={handleBlur}
                  error={errors.owner && touched.owner}
                  helperText={errors.owner && touched.owner ? errors.owner : ''}
                  SelectProps={{
                    native: true,
                  }}
                  select={true}
                >
                  {owners &&
                    owners.map((option, key) => (
                      <option value={option.id} key={key}>
                        {option.firstname}
                      </option>
                    ))}
                </TextField>
                <Button onClick={handleSubmit}>Guardar</Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
