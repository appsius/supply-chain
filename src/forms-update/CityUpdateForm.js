import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { createData, updateData } from '../helpers';

export default function CityUpdateForm({
  cities,
  countries,
  setCities,
  citiesGetURL,
  selectedCity,
  cityUpdateURL,
  resetMode,
  setResetMode,
  setRenderedData,
  // showCreateForm,
  // setShowCreateForm,
  // show|hide udpdate form
  setShowCityTable,
  showCityUpdateForm,
  setShowCityUpdateForm,
}) {
  const [cityAlreadyExist, setCityAlreadyExist] = useState([]);

  const validate = (values) => {
    const errors = {};
    if (!values.cityName && resetMode === false) {
      errors.cityName = 'Required';
    }
    if (cityAlreadyExist.length > 0) {
      errors.cityName = 'Cty already exist!';
    }
    if (!values.country && resetMode === false) {
      errors.country = 'Required';
    }
    return errors;
  };

  const updateCity = (values) => {
    const [cityCountry] = countries.filter((c) => c.name === values.country);
    const { cityName, country } = values;

    if (selectedCity && cityName && country) {
      const newCity = {
        id: selectedCity.id,
        name: cityName,
        countryId: cityCountry.id,
        country: {
          name: country,
          id: cityCountry.id,
        },
      };

      const body = JSON.stringify(newCity);
      updateData(citiesGetURL, setCities, cityUpdateURL, body);
      setCityAlreadyExist([]);
      setShowCityUpdateForm(false);
      setShowCityTable(true);
      setRenderedData('cities-rendered');
      console.log(newCity);
    }
  };

  const controlCityExist = (val) => {
    const sameCities = cities.filter(
      (city) => city.name.trim().toLowerCase() === val.trim().toLowerCase()
    );
    setResetMode(false);
    setCityAlreadyExist(sameCities);
  };

  const handleCountriesSelect = () => {
    setResetMode(false);
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
      className={showCityUpdateForm ? 'show' : 'hide'}
    >
      <div className='City-update Create-form'>
        <Form
          onSubmit={(data) => updateCity(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            // className='Create-form' ll be removed
            <form onSubmit={handleSubmit} noValidate className='Create-form'>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems='flex-start' spacing={8}>
                  <h2
                    style={{
                      margin: '10px auto 0 35px',
                      paddingTop: '25px',
                      paddingBottom: '10px',
                      fontWeight: '500',
                    }}
                  >
                    City Update Form
                  </h2>
                  <Grid
                    item
                    xs={12}
                    onChange={(e) => controlCityExist(e.target.value)}
                  >
                    <Field
                      fullWidth
                      name='cityName'
                      component={TextField}
                      label='City name'
                    />
                  </Grid>
                  <Grid item xs={12} className='Select-country'>
                    <Field
                      fullWidth
                      name='country'
                      component={Select}
                      label='Select a Country'
                      onClick={() => handleCountriesSelect()}
                      formControlProps={{ fullWidth: true }}
                    >
                      {getCountriesMenu()}
                    </Field>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      className='Form-buttons city-form-buttons'
                      variant='contained'
                      type='submit'
                      onClick={() => {
                        setResetMode(false);
                        !showCityUpdateForm && form.reset();
                        setTimeout(() => {
                          form.reset();
                        }, 1000);
                      }}
                      disabled={submitting || cityAlreadyExist.length > 0}
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
    </div>
  );
}