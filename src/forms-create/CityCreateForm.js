import React from 'react';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { createData, getData } from '../helpers';

const validate = (values) => {
  const errors = {};
  if (!values.cityName) {
    errors.cityName = 'Required';
  }
  if (!values.country) {
    errors.country = 'Required';
  }
  return errors;
};

export default function CityCreateForm({
  countries,
  setCities,
  citiesGetURL,
  countriesGetURL,
  setCountries,
  cityCreateURL,
  showCreateForm,
  setShowCreateForm,
  setRenderedData,
}) {
  console.log(countries);

  const createNewCity = async (values) => {
    const [cityCountry] = countries.filter((c) => c.name === values.country);
    const cityCountryID = cityCountry.id;
    const { cityName, country } = values;
    const newCity = {
      name: cityName,
      countryId: cityCountryID,
      country: {
        name: country,
        id: cityCountryID,
      },
    };
    const body = JSON.stringify(newCity);

    createData(citiesGetURL, setCities, cityCreateURL, body);
    setRenderedData('cities-rendered');
    setShowCreateForm(true);
    console.log(newCity);
  };

  const getCountriesMenu = () => {
    return countries.map((country) => (
      <MenuItem key={country.id} value={country.name}>
        {country.name}
      </MenuItem>
    ));
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 600 }}
      className={'Create-form' && showCreateForm ? 'hide' : 'show'}
    >
      <Form
        onSubmit={(data) => createNewCity(data)}
        validate={validate}
        render={({ form, handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate className='Create-form '>
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
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='cityName'
                    component={TextField}
                    multiline
                    label='City name'
                  />
                </Grid>
                <Grid item xs={12} className='Select-country'>
                  <Field
                    fullWidth
                    name='country'
                    component={Select}
                    label='Select a Country'
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
