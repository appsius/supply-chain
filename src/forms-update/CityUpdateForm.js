import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { updateData } from '../helpers';

export default function CityUpdateForm({
  // city data
  cities,
  countries,
  setCities,
  citiesGetURL,
  cityUpdateURL,
  // selected city data for filling labels
  selectedCity,
  setSelectedCity,
  selectedCityName,
  setSelectedCityName,
  selectedCityCountryName,
  setSelectedCityCountryName,
  //
  resetMode,
  setResetMode,
  cityResetMode,
  setCityResetMode,
  // show|hide udpdate form
  setShowCityTable,
  showCityUpdateForm,
  setShowCityUpdateForm,
  setRenderedData,
}) {
  const [cityAlreadyExist, setCityAlreadyExist] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.cityName && cityResetMode === false) {
      errors.cityName = 'Required';
    }
    if (cityAlreadyExist) {
      errors.cityName = 'City already exist!';
    }
    if (!values.country && resetMode === false) {
      errors.country = 'Required';
    }
    return errors;
  };

  const updateCity = (values) => {
    const { cityName } = values;
    const [countryOfCity] = countries.filter(
      (c) => c.name === selectedCityCountryName
    );
    const { id, name } = countryOfCity;
    const newCity = {
      id: selectedCity.id,
      name: selectedCityName ? selectedCityName : cityName,
      countryId: id,
      country: {
        name,
        id,
      },
    };

    if (newCity.id && newCity.name && newCity.countryId) {
      const body = JSON.stringify(newCity);
      updateData(citiesGetURL, setCities, cityUpdateURL, body);
      setCityAlreadyExist(false);
      setSelectedCity({});
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

    if (sameCities.length > 0) {
      setCityAlreadyExist(true);
    }
    setSelectedCityName(val);
  };

  const handleCityClick = () => {
    setCityResetMode(false);
  };

  const handleCountryClick = (country) => {
    setSelectedCityCountryName(country.name);
  };

  const handleCountriesSelect = () => {
    setResetMode(false);
  };

  const handleCancelButton = () => {
    // reset update data
    setCityAlreadyExist(false);
    setSelectedCity({});
    // show supplier table
    setShowCityUpdateForm(false);
    setShowCityTable(true);
    setRenderedData('cities-rendered');
  };

  const getCountriesMenu = () => {
    return countries.map((country) => (
      <MenuItem
        key={country.id}
        value={country.name}
        onClick={() => handleCountryClick(country)}
      >
        {country.name}
      </MenuItem>
    ));
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 600 }}
      className={showCityUpdateForm ? 'show' : 'hide'}
    >
      <div>
        <Form
          onSubmit={(data) => updateCity(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className='City-update-form'
            >
              <Paper style={{ padding: '16px 16px 56px 16px' }}>
                <Grid container alignItems='flex-start' spacing={8}>
                  <h2
                    style={{
                      margin: '10px auto 0 35px',
                      paddingTop: '25px',
                      paddingBottom: '10px',
                      fontWeight: '300',
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
                      label={cityResetMode ? selectedCityName : 'City name'}
                      onClick={() => handleCityClick()}
                    />
                  </Grid>
                  <Grid item xs={12} className='Select-country'>
                    <Field
                      fullWidth
                      name='country'
                      component={Select}
                      label={
                        resetMode ? selectedCityCountryName : 'Select a Country'
                      }
                      onClick={() => handleCountriesSelect()}
                      formControlProps={{ fullWidth: true }}
                    >
                      {getCountriesMenu()}
                    </Field>
                  </Grid>
                  <Grid
                    item
                    style={{ marginTop: 16 }}
                    xs={12}
                    className='Buttons'
                  >
                    <Button
                      className='Form-buttons City-cancel-button'
                      variant='contained'
                      type='cancel'
                      onClick={() => {
                        handleCancelButton();
                        form.reset();
                      }}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
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
    </div>
  );
}
