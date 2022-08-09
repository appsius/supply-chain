import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { updateData } from '../helpers';

export default function SupplierUpdateForm({
  countries,
  cities,
  suppliersGetURL,
  setSuppliers,
  selectedUpdateSupplier,
  supplierUpdateURL,
  setRenderedData,
  // validation reset modes
  resetCodeMode,
  resetNameMode,
  resetDNameMode,
  resetAddressMode,
  resetCityMode,
  resetCountryMode,
  resetSTypeMode,
  setResetCodeMode,
  setResetNameMode,
  setResetDNameMode,
  setResetAddresssMode,
  setResetCityMode,
  setResetCountryMode,
  setResetSTypeMode,
  // show|hide udpdate form
  setShowSupplierTable,
  showSupplierUpdateForm,
  setShowSupplierUpdateForm,
}) {
  const validate = (values) => {
    const errors = {};
    if (!values.code && resetCodeMode === false) {
      errors.code = 'Supplier code is required';
    }
    if (!values.name && resetNameMode === false) {
      errors.name = 'Name is required';
    }
    if (!values.displayName && resetDNameMode === false) {
      errors.displayName = 'Display name is required';
    }
    if (!values.address && resetAddressMode === false) {
      errors.address = 'Address is required';
    }
    if (!values.selectedCityName && resetCityMode === false) {
      errors.selectedCityName = countryHasNoCity
        ? 'No city found'
        : 'City is required';
    }
    if (!values.selectedCountryName && resetCountryMode === false) {
      errors.selectedCountryName = 'Country is required';
    }
    if (!values.selectedSupplierTypeName && resetSTypeMode === false) {
      errors.selectedSupplierTypeName = 'Supplier type is required';
    }
    return errors;
  };
  const [supplierTypes, setSupplierTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedSupplierType, setSelectedSupplierType] = useState({});
  const [selectedCities, setSelectedCities] = useState([]);
  const [countryHasNoCity, setCountryHasNoCity] = useState(false);

  useEffect(() => {
    fetch('http://45.130.15.52:6501/api/services/app/SupplierType/GetAll')
      .then((res) => res.json())
      .then(({ result }) => setSupplierTypes(result.items));
  }, []);

  const updateSupplier = async (values) => {
    const { code, name, displayName, address } = values;
    const newSupplier = {
      id: selectedUpdateSupplier.id,
      code,
      name,
      displayName,
      address,
      cityId: selectedCity.id,
      countryId: selectedCountry.id,
      supplierTypeId: selectedSupplierType.id,
    };

    if (
      selectedUpdateSupplier &&
      code &&
      name &&
      displayName &&
      address &&
      selectedCity.id &&
      selectedCountry.id &&
      selectedSupplierType.id
    ) {
      const body = JSON.stringify(newSupplier);
      updateData(suppliersGetURL, setSuppliers, supplierUpdateURL, body);
      setSelectedCountry({});
      setSelectedCities([]);
      setSelectedSupplierType({});
      setShowSupplierUpdateForm(false);
      setShowSupplierTable(true);
      setRenderedData('suppliers-rendered');
      console.log(newSupplier);
    }
  };

  const handleCitySelected = (countryID, city) => {
    const [countryOfCity] = countries.filter((c) => c.id === countryID);
    setSelectedCountry(countryOfCity);
    setSelectedCity(city);
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

  const handleSupplierTypeSelected = (supplierTypeID) => {
    const [filteredSupplierType] = supplierTypes.filter(
      (sType) => sType.id === supplierTypeID
    );
    setSelectedSupplierType(filteredSupplierType);
  };

  const getCitiesMenu = () => {
    if (selectedCities.length > 0) {
      return selectedCities.map((sCity) => {
        const { id, name, countryId } = sCity;
        if (countryId) {
          return (
            <MenuItem
              key={id}
              value={name}
              onClick={() => handleCitySelected(countryId, sCity)}
            >
              {name}
            </MenuItem>
          );
        }
      });
    } else {
      return cities.map((city) => {
        const { id, name, countryId } = city;
        if (countryId) {
          return (
            <MenuItem
              key={id}
              value={name}
              onClick={() => handleCitySelected(countryId, city)}
            >
              {name}
            </MenuItem>
          );
        }
      });
    }
  };

  const getCountriesMenu = () => {
    const { id, name } = selectedCountry;
    if (name) {
      return (
        <MenuItem
          key={id}
          value={name}
          onClick={() => handleCountrySelected(id)}
        >
          {name}
        </MenuItem>
      );
    } else {
      return countries.map((country) => {
        const { id, name } = country;
        return (
          <MenuItem
            key={id}
            value={name}
            onClick={() => handleCountrySelected(id)}
          >
            {name}
          </MenuItem>
        );
      });
    }
  };

  const getSupplierTypesMenu = () => {
    return supplierTypes.map((supplierType) => {
      const { id, name } = supplierType;
      return (
        <MenuItem
          key={id}
          value={name}
          onClick={() => handleSupplierTypeSelected(id)}
        >
          {name}
        </MenuItem>
      );
    });
  };

  // resetting validation for supplier after submit
  const handleCodeResetMode = () => {
    setResetCodeMode(false);
  };
  const handleNameResetMode = () => {
    setResetNameMode(false);
  };
  const handleDisplayNameResetMode = () => {
    setResetDNameMode(false);
  };
  const handleAdressResetMode = () => {
    console.log(resetAddressMode);
    setResetAddresssMode(false);
  };
  const handleCityResetMode = () => {
    console.log(resetCityMode);
    setResetCityMode(false);
  };
  const handleCountryResetMode = () => {
    setResetCountryMode(false);
  };
  const handleSupplierTypeResetMode = () => {
    setResetSTypeMode(false);
  };

  return (
    <div
      style={{ padding: '16px', margin: 'auto', maxWidth: 7500 }}
      className={showSupplierUpdateForm ? 'show' : 'hide'}
    >
      <div className='Supplier-update Create-form'>
        <Form
          onSubmit={(data) => updateSupplier(data)}
          validate={validate}
          render={({ form, handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className='Supplier-create-form'
            >
              <Paper style={{ padding: '16px 16px 44px 16px' }}>
                <Grid container alignItems='flex-start' spacing={8}>
                  <Grid item xs={12}>
                    <h2
                      style={{
                        marginLeft: '-61%',
                        fontWeight: '500',
                      }}
                    >
                      Supplier Update Form
                    </h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='code'
                      component={TextField}
                      label='Supplier code'
                      onClick={() => handleCodeResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='name'
                      component={TextField}
                      label='Supplier Name'
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='displayName'
                      component={TextField}
                      label='Display Name'
                      onClick={() => handleDisplayNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='address'
                      component={TextField}
                      label='Address'
                      onClick={() => handleAdressResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='selectedCityName'
                      component={Select}
                      label={
                        countryHasNoCity ? 'No city found' : 'Select a City'
                      }
                      formControlProps={{ fullWidth: true }}
                      onClick={() => handleCityResetMode()}
                      disabled={countryHasNoCity}
                    >
                      {getCitiesMenu()}
                    </Field>
                  </Grid>
                  <Grid item xs={6} className='Select-country'>
                    <Field
                      fullWidth
                      name='selectedCountryName'
                      component={Select}
                      label='Select a Country'
                      formControlProps={{ fullWidth: true }}
                      onClick={() => handleCountryResetMode()}
                    >
                      {getCountriesMenu()}
                    </Field>
                  </Grid>
                  <Grid item xs={6} className='Select-supplier-type'>
                    <Field
                      fullWidth
                      name='selectedSupplierTypeName'
                      component={Select}
                      label='Select Supplier Type'
                      formControlProps={{ fullWidth: true }}
                      onClick={() => handleSupplierTypeResetMode()}
                    >
                      {getSupplierTypesMenu()}
                    </Field>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      className='Form-buttons'
                      variant='contained'
                      type='submit'
                      onClick={() => {
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
