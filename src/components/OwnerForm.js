import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, TextField } from '@mui/material';
import OwnerService from '../services/OwnerService';
import { useHistory } from 'react-router';

export default function OwnerForm() {
  const history = useHistory();
  const initialValuesForm = {
    firstname: '',
    lastname: '',
  };

  const schemaForm = Yup.object().shape({
    firstname: Yup.string().required('Campo requerido'),
    lastname: Yup.string().required('Campo requerido'),
  });

  const onSubmitForm = async (values) => {
    try {
      const response = await OwnerService.createOwner(values);
      if (response) {
        history.push('/owners/');
      }
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
                <h3>Propietario creación</h3>
                <TextField
                  variant='standard'
                  fullWidth
                  label='Nombre*'
                  placeholder='Nombre'
                  id='firstname'
                  name='firstname'
                  autoComplete='firstname'
                  inputProps={{ autoCorrect: 'off', autoCapitalize: 'none' }}
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstname && touched.firstname}
                  helperText={
                    errors.firstname && touched.firstname
                      ? errors.firstname
                      : ''
                  }
                />
                <TextField
                  variant='standard'
                  fullWidth
                  label='Apellido*'
                  placeholder='Apellido'
                  id='lastname'
                  name='lastname'
                  autoComplete='lastname'
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastname && touched.lastname}
                  helperText={
                    errors.lastname && touched.lastname ? errors.lastname : ''
                  }
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
