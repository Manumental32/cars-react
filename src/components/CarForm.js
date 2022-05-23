import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CarService from '../services/CarService';
import OwnerService from '../services/OwnerService';
import { useHistory, useParams } from 'react-router';
import { DisplayFormikState } from '../utils';
import { DeleteOutline } from '@mui/icons-material';
import ServiceService from '../services/ServiceService';
import { CURRENCY } from '../constants';

export default function CarForm() {
  const [owners, setOwners] = useState(null);
  const [car, setCar] = useState(null);
  const [services, setServices] = useState([]);
  const { carId } = useParams();
  const history = useHistory();

  const isNew = carId === 'new';

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialData = async () => {
    try {
      const responseOwners = await OwnerService.getOwners();
      setOwners(responseOwners.data);
      const responseServices = await ServiceService.getServices();
      setServices(responseServices.data);
      if (!isNew) {
        const responseCar = await CarService.getCars(carId);
        setCar(responseCar.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mockValuesForm = {
    brand: '',
    model: '',
    licensePlate: '',
    color: '',
    owners: [],
    services: [],
  };
  const initialValuesForm = { ...mockValuesForm, ...car };

  const schemaForm = Yup.object().shape({
    brand: Yup.string().required('Campo requerido'),
    model: Yup.string().required('Campo requerido'),
    licensePlate: Yup.string().required('Campo requerido'),
    color: Yup.string().required('Campo requerido'),
  });

  const onSubmitForm = async (values) => {
    try {
      let response = null;
      if (isNew) {
        response = await CarService.createCar(values);
      } else {
        response = await CarService.updateCar(values);
      }
      console.log(response);
      if (response) {
        history.push('/cars/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteFormField = (setFieldValue, arrayValues, key) => {
    const inputToDeleted = arrayValues.splice(key, 1);
    setFieldValue(inputToDeleted);
  };
  const isLastInputCompleted = (arrayValues) => {
    return arrayValues[arrayValues.length - 1] !== '';
  };
  const createEmptyFormField = (setFieldValue, arrayValues) => {
    const inputAdded = arrayValues.push('');
    setFieldValue(inputAdded);
  };

  const addFormField = (setFieldValue, arrayValues) => {
    if (arrayValues.length === 0 || isLastInputCompleted(arrayValues)) {
      createEmptyFormField(setFieldValue, arrayValues);
    }
  };

  const handleChangeAutocomplete = (
    event,
    tagsValue,
    reason,
    setFieldValue
  ) => {
    //reason: 'select-option','create-option', 'remove-option', 'blur', 'clear'
    setFieldValue('owners', tagsValue);
    if (reason === 'remove-option') {
      clearMainTags(tagsValue, setFieldValue);
    }
    if (reason === 'clear') {
      clearMainTags(tagsValue);
    }
  };

  const clearMainTags = (setFieldValue) => {
    setFieldValue('owners', []);
  };

  const titleForm = isNew ? 'Crear Auto' : 'Editar Auto';

  const handlerOnChangeServiceSelect = (e, setFieldValue, values) => {
    const serviceIdSelected = e.target.value;
    const serviceSelected = services.find(
      (service) => (service.id = serviceIdSelected)
    );
    let newServices = [...values.services, serviceSelected];
    setFieldValue('services', newServices);
  };

  // const isSelected = (option, values) => {
  //   return option?.id === values?.services?.id;
  // };

  return (
    <>
      <Formik
        initialValues={initialValuesForm}
        onSubmit={onSubmitForm}
        validationSchema={schemaForm}
        enableReinitialize={true}
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
                <h3>{titleForm}</h3>
                <TextField
                  variant='standard'
                  fullWidth
                  label='Marca*'
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
                  label='Modelo*'
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
                  label='Patente*'
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

                {owners && values.owners && (
                  <Autocomplete
                    multiple={true}
                    options={owners}
                    getOptionLabel={(owner) => owner.firstname}
                    value={values.owners}
                    onChange={(e, value, reason) =>
                      handleChangeAutocomplete(e, value, reason, setFieldValue)
                    }
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        name='owners'
                        {...params}
                        variant='standard'
                        error={errors.owners}
                        helperText={errors.owners ? errors.owners : ''}
                      />
                    )}
                  />
                )}

                <Container disableGutters>
                  <Typography variant='body1'>Servicios</Typography>
                  {values.services.map((option, key) => (
                    <Grid item container spacing={1} key={key}>
                      <Grid item xs={11}>
                        <TextField
                          variant='standard'
                          fullWidth
                          label='Seleccionar servicio'
                          placeholder='Seleccionar servicio'
                          id={`services-${key}`}
                          name={`services[${key}]`}
                          value={values.services}
                          onChange={(e) =>
                            handlerOnChangeServiceSelect(
                              e,
                              setFieldValue,
                              values
                            )
                          }
                          onBlur={handleBlur}
                          error={errors.services && touched.services}
                          helperText={
                            errors.services && touched.services
                              ? errors.services
                              : ''
                          }
                          SelectProps={{
                            native: true,
                          }}
                          select={true}
                        >
                          <option value='' key='empty-select'></option>
                          {services &&
                            services.map((option, key) => (
                              <option
                                value={option.id}
                                key={key}
                                // selected={isSelected(option, values)}
                              >
                                {`${option.name} (${CURRENCY}${option.cost})`}
                              </option>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() =>
                            deleteFormField(setFieldValue, values.services, key)
                          }
                          disableRipple
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      label={'Agregar'}
                      onClick={() =>
                        addFormField(setFieldValue, values.services)
                      }
                    >
                      Agregar servicio
                    </Button>
                  </Grid>
                </Container>

                <DisplayFormikState {...props} />

                <Button onClick={handleSubmit}>Guardar</Button>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
