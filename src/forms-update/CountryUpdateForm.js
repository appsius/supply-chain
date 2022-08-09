import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button } from '@material-ui/core';
import { updateData } from '../helpers';

export default function CountryUpdateForm({
  countries,
  countriesGetURL,
  setCountries,
  selectedCountry,
  setSelectedCountry,
  selectedCountryName,
  setSelectedCountryName,
  countryUpdateURL,
  resetMode,
  setResetMode,
  setRenderedData,
  // show|hide udpdate form
  setShowCountryTable,
  showCountryUpdateForm,
  setShowCountryUpdateForm,
}) {
  console.log(selectedCountryName);
  const validate = (values) => {
    const errors = {};
    if (!values.country && resetMode === false) {
      errors.country = 'Required';
    }
    if (countryAlreadyExist.length > 1) {
      errors.country = 'Country already exist!';
    }
    return errors;
  };
  const [countryAlreadyExist, setCountryAlreadyExist] = useState('');

  const updateCountry = async (values) => {
    const updatedCountry = {
      id: selectedCountry.id,
      name: values.country,
    };

    if (selectedCountry && values.country) {
      const body = JSON.stringify(updatedCountry);
      setCountryAlreadyExist([]);
      updateData(countriesGetURL, setCountries, countryUpdateURL, body);
      setShowCountryUpdateForm(false);
      setShowCountryTable(true);
      setRenderedData('countries-rendered');
      console.log(updatedCountry);
    }
  };

  const controlUpdateCountryExist = (val) => {
    console.log(val, countries, selectedCountry);
    const sameCountries = countries.filter(
      (country) =>
        country.name.trim().toLowerCase() === val.trim().toLowerCase()
    );
    setResetMode(false);
    setSelectedCountryName('');
    setCountryAlreadyExist(sameCountries);
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 600 }}
      className={showCountryUpdateForm ? 'show' : 'hide'}
    >
      <div className='Country-update Create-form'>
        <Form
          onSubmit={(data) => updateCountry(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate className='Create-form '>
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
                    Country Update Form
                  </h2>
                  <Grid
                    item
                    xs={12}
                    onChange={(e) => controlUpdateCountryExist(e.target.value)}
                  >
                    <Field
                      fullWidth
                      name='country'
                      component={TextField}
                      label={
                        selectedCountryName
                          ? selectedCountryName
                          : 'Country name'
                      }
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      className='Form-buttons country-form-buttons'
                      type='submit'
                      variant='contained'
                      onClick={() => {
                        setResetMode(false);
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
