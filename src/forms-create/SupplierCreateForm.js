import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { createData, getData } from '../helpers';

export default function SupplierCreateForm({
  countries,
  cities,
  suppliersGetURL,
  setSuppliers,
  supplierCreateURL,
  countriesGetURL,
  setCountries,
  citiesGetURL,
  setCities,
  showCreateForm,
  setShowCreateForm,
  setRenderedData,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.supplierType) {
      errors.supplierType = 'Supplier type is required';
    }
    if (!values.code) {
      errors.code = 'Supplier code is required';
    }
    if (!values.supplierName) {
      errors.supplierName = 'Name is required';
    }
    if (!values.address) {
      errors.address = 'Address is required';
    }
    if (!values.country) {
      errors.country = 'Country is required';
    }
    if (!values.city) {
      errors.city = countryHasNoCity
        ? 'Please add a city to the current country'
        : 'City is required';
    }
    return errors;
  };
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCities, setSelectedCities] = useState([]);
  const [countryHasNoCity, setCountryHasNoCity] = useState(false);
  // useEffect(() => {
  //   getData(citiesGetURL, setCities);
  //   getData(countriesGetURL, setCountries);
  // }, []);

  const createNewSupplier = async (values) => {
    const { code, supplierName, address, city, country, supplierType } = values;
    const [supplierCountry] = countries.filter((c) => c.name === country);
    const [supplierCity] = cities.filter((c) => c.name === city);

    const newSupplier = {
      countryId: supplierCountry.id,
      cityId: supplierCity.id,
      supplierTypeId: new Date().getTime(),
      displayName: supplierName,
      code,
      name: supplierName,
      address,
      city: {
        name: city,
        country: {
          name: country,
          id: supplierCountry.id,
        },
      },
      supplierType: {
        name: supplierType,
      },
    };

    const body = JSON.stringify(newSupplier);
    createData(suppliersGetURL, setSuppliers, supplierCreateURL, body);
    setRenderedData('suppliers-rendered');
    setShowCreateForm(true);
    setSelectedCountry({});
    setSelectedCities([]);
    console.log(newSupplier);
  };

  const handleCountrySelected = (countryID) => {
    const citiesOfCountry = cities.filter(
      (city) => city.countryId === countryID
    );
    citiesOfCountry.length > 0
      ? setCountryHasNoCity(false)
      : setCountryHasNoCity(true);
    setSelectedCities(citiesOfCountry);
  };

  const handleCitySelected = (countryID) => {
    const [countryOfCity] = countries.filter((c) => c.id === countryID);
    setSelectedCountry(countryOfCity);
  };

  const getCountriesMenu = () => {
    if (selectedCountry.name) {
      return (
        <MenuItem
          key={selectedCountry.id}
          value={selectedCountry.name}
          onClick={() => handleCountrySelected(selectedCountry.id)}
        >
          {selectedCountry.name}
        </MenuItem>
      );
    } else {
      return countries.map((country) => (
        <MenuItem
          key={country.id}
          value={country.name}
          onClick={() => handleCountrySelected(country.id)}
        >
          {country.name}
        </MenuItem>
      ));
    }
  };

  const getCitiesMenu = () => {
    if (selectedCities.length > 0) {
      return selectedCities.map((city) => (
        <MenuItem
          key={city.id}
          value={city.name}
          onClick={() => handleCitySelected(city.countryId)}
        >
          {city.name}
        </MenuItem>
      ));
    } else {
      return cities.map((city) => (
        <MenuItem
          key={city.id}
          value={city.name}
          onClick={() => handleCitySelected(city.countryId)}
        >
          {city.name}
        </MenuItem>
      ));
    }
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 7500 }}
      className={showCreateForm ? 'hide' : 'show'}
    >
      <Form
        onSubmit={(data) => createNewSupplier(data)}
        validate={validate}
        render={({ form, handleSubmit, submitting, pristine, values }) => (
          <form
            onSubmit={handleSubmit}
            noValidate
            className='Supplier-create-form'
          >
            <OnChange name='country'>
              {(value) => {
                form.reset({
                  ...values,
                  country: value,
                });
              }}
            </OnChange>

            <Paper style={{ padding: 16 }}>
              <Grid container alignItems='flex-start' spacing={8}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name='code'
                    component={TextField}
                    multiline
                    label='Supplier code'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name='supplierName'
                    component={TextField}
                    multiline
                    label='Name'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name='supplierType'
                    component={TextField}
                    multiline
                    label='Supplier type'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name='address'
                    component={TextField}
                    multiline
                    label='Address'
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    name='city'
                    component={Select}
                    label={
                      countryHasNoCity
                        ? 'Please add a city to current country'
                        : 'Select a City'
                    }
                    value={
                      countryHasNoCity ? 'Please add a city' : 'Select a City'
                    }
                    formControlProps={{ fullWidth: true }}
                    disabled={countryHasNoCity}
                  >
                    {getCitiesMenu()}
                  </Field>
                </Grid>
                <Grid item xs={6} className='Select-country '>
                  <Field
                    fullWidth
                    name='country'
                    component={Select}
                    label='Select a Country'
                    value='Select a Country'
                    formControlProps={{ fullWidth: true }}
                  >
                    {getCountriesMenu()}
                  </Field>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type='button'
                    variant='contained'
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
  );
}
