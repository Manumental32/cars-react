import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import CarService from '../services/CarService';

export default function CarForm() {
  const initialValuesForm = {
    brand: '',
    model: '',
    licensePlate: '',
    color: '',
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
                <Button onClick={handleSubmit}>Guardar</Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
