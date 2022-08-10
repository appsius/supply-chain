import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button } from '@material-ui/core';
import { createData } from '../helpers';

export default function CountryCreateForm({
  countries,
  countriesGetURL,
  setCountries,
  countryCreateURL,
  resetMode,
  setResetMode,
  setRenderedData,
  // show|hide create form or table
  setShowCountryTable,
  showCountryCreateForm,
  setShowCountryCreateForm,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.country && resetMode === false) {
      errors.country = 'Required';
    }
    if (countryAlreadyExist.length > 0) {
      errors.country = 'Country already exist!';
    }
    return errors;
  };
  const [countryAlreadyExist, setCountryAlreadyExist] = useState([]);

  const createNewCountry = async (values) => {
    const newCountry = {
      name: values.country,
    };
    if (values.country) {
      const body = JSON.stringify(newCountry);
      setCountryAlreadyExist([]);
      createData(countriesGetURL, setCountries, countryCreateURL, body);
      setShowCountryCreateForm(false);
      setShowCountryTable(true);
      setRenderedData('countries-rendered');
      console.log(newCountry);
    }
  };

  const controlCountryExist = (val) => {
    const sameCountries = countries.filter(
      (country) =>
        country.name.trim().toLowerCase() === val.trim().toLowerCase()
    );
    setResetMode(false);
    setCountryAlreadyExist(sameCountries);
  };

  const handleCancelButton = () => {
    // reset update data
    setCountryAlreadyExist([]);
    // show supplier table
    setShowCountryCreateForm(false);
    setShowCountryTable(true);
    setRenderedData('countries-rendered');
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 600 }}
      className={showCountryCreateForm ? 'show' : 'hide'}
    >
      <div className='Country-create Create-form'>
        <Form
          onSubmit={(data) => createNewCountry(data)}
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
                    Country Create Form
                  </h2>
                  <Grid
                    item
                    xs={12}
                    onChange={(e) => controlCountryExist(e.target.value)}
                  >
                    <Field
                      fullWidth
                      name='country'
                      component={TextField}
                      label='Country name'
                    />
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
                      className='Form-buttons country-form-buttons'
                      type='submit'
                      variant='contained'
                      onClick={() => {
                        setResetMode(false);
                        setTimeout(() => {
                          form.reset();
                        }, 1000);
                      }}
                      disabled={submitting || countryAlreadyExist.length > 0}
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
