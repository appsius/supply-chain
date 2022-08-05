import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button } from '@material-ui/core';
import { createData, getData } from '../helpers';

const validate = (values) => {
  const errors = {};
  if (!values.country) {
    errors.country = 'Required';
  }
  return errors;
};

export default function CountryCreateForm({
  countriesGetURL,
  setCountries,
  countryCreateURL,
  showCreateForm,
  setShowCreateForm,
  setRenderedData,
}) {
  const createNewCountry = async (values) => {
    const newCountry = {
      name: values.country,
    };
    const body = JSON.stringify(newCountry);

    createData(countriesGetURL, setCountries, countryCreateURL, body);
    setShowCreateForm(true);
    setRenderedData('countries-rendered');
    console.log(newCountry);
  };

  return (
    <div
      style={{ padding: 16, margin: 'auto', maxWidth: 600 }}
      className={'Create-form' && showCreateForm ? 'hide' : 'show'}
    >
      <Form
        onSubmit={(data) => createNewCountry(data)}
        validate={validate}
        render={({ form, handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate className='Create-form '>
            <OnChange name='name'>
              {() => {
                form.reset({
                  ...values,
                  name: '',
                });
              }}
            </OnChange>

            <Paper style={{ padding: 16 }}>
              <Grid container alignItems='flex-start' spacing={8}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='country'
                    component={TextField}
                    multiline
                    label='Country name'
                  />
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
                    type='submit'
                    variant='contained'
                    color='primary'
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
