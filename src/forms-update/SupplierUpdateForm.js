import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, MenuItem } from '@material-ui/core';
import { updateData } from '../helpers';

export default function SupplierUpdateForm({
  cities,
  countries,
  supplierTypes,
  suppliersGetURL,
  setSuppliers,
  supplierUpdateURL,
  selectedUpdateSupplier,
  setSelectedUpdateSupplier,
  updateSupplierCode,
  setUpdateSupplierCode,
  updatedSupplierName,
  setUpdatedSupplierName,
  updatedSupplierDName,
  setUpdatedSupplierDName,
  updatedSupplierAddress,
  setUpdatedSupplierAddress,
  updatedSupplierCity,
  setUpdatedSupplierCity,
  updatedSupplierCountry,
  setUpdatedSupplierCountry,
  updatedSupplierSType,
  setUpdatedSupplierSType,
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
  setRenderedData,
}) {
  console.log(updatedSupplierCity);
  console.log(updatedSupplierCountry);
  console.log(updatedSupplierSType);
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
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedSupplierType, setSelectedSupplierType] = useState({});
  const [countryHasNoCity, setCountryHasNoCity] = useState(false);

  const updateSupplier = async (values) => {
    const { code, name, displayName, address } = values;

    let updatedSupplier = {
      id: selectedUpdateSupplier.id,
      code: code ? code : selectedUpdateSupplier.code,
      name: name ? name : selectedUpdateSupplier.name,
      displayName: displayName
        ? displayName
        : selectedUpdateSupplier.displayName,
      address: address ? address : selectedUpdateSupplier.address,
      cityId: selectedCity.id ? selectedCity.id : updatedSupplierCity.id,
      countryId: selectedCountry.id
        ? selectedCountry.id
        : updatedSupplierCountry.id,
      supplierTypeId: selectedSupplierType.id
        ? selectedSupplierType.id
        : updatedSupplierSType.id,
    };

    console.log(updatedSupplier);

    if (
      updatedSupplier.code &&
      updatedSupplier.name &&
      updatedSupplier.displayName &&
      updatedSupplier.address &&
      updatedSupplier.cityId &&
      updatedSupplier.countryId &&
      updatedSupplier.supplierTypeId
    ) {
      const body = JSON.stringify(updatedSupplier);
      updateData(suppliersGetURL, setSuppliers, supplierUpdateURL, body);
      // reset update initial data
      setUpdatedSupplierCity({});
      setUpdatedSupplierCountry({});
      setUpdatedSupplierSType({});
      setSelectedUpdateSupplier({});
      // reset update later data
      setSelectedCities([]);
      setSelectedCity({});
      setSelectedCountry({});
      setSelectedSupplierType({});
      //
      setShowSupplierUpdateForm(false);
      setShowSupplierTable(true);
      setRenderedData('suppliers-rendered');
      // console.log(updatedSupplier);
    }
  };

  const handleCitySelected = (city) => {
    setUpdatedSupplierCountry({});
    setResetCountryMode(false);
    const countryOfCity = countries.filter((c) => c.id === city.countryId);
    setSelectedCountry(countryOfCity[0]);
    setSelectedCity(city);
  };

  const handleCountrySelected = (country) => {
    setUpdatedSupplierCity({});
    setResetCityMode(false);
    const citiesOfCountry = cities.filter(
      (city) => city.countryId === country.id
    );
    citiesOfCountry.length > 0
      ? setCountryHasNoCity(false)
      : setCountryHasNoCity(true);
    setSelectedCities(citiesOfCountry);
    setSelectedCountry(country);
  };

  const handleSupplierTypeSelected = (supplierType) => {
    setSelectedSupplierType(supplierType);
  };

  const getCitiesMenu = () => {
    if (selectedCities.length > 0) {
      return selectedCities.map((sCity) => {
        const { id, name, countryId } = sCity;
        return (
          <MenuItem
            key={id}
            value={name}
            onClick={() => handleCitySelected(sCity)}
          >
            {name}
          </MenuItem>
        );
      });
    } else {
      return cities.map((city) => {
        const { id, name, countryId } = city;
        if (countryId) {
          return (
            <MenuItem
              key={id}
              value={name}
              onClick={() => handleCitySelected(city)}
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
          onClick={() => handleCountrySelected(selectedCountry)}
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
            onClick={() => handleCountrySelected(country)}
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
          onClick={() => handleSupplierTypeSelected(supplierType)}
        >
          {name}
        </MenuItem>
      );
    });
  };

  // resetting validation for supplier after submit
  const handleCodeResetMode = () => {
    setUpdateSupplierCode('');
    setResetCodeMode(false);
  };
  const handleNameResetMode = () => {
    setUpdatedSupplierName('');
    setResetNameMode(false);
  };
  const handleDisplayNameResetMode = () => {
    setUpdatedSupplierDName('');
    setResetDNameMode(false);
  };
  const handleAdressResetMode = () => {
    setUpdatedSupplierAddress('');
    setResetAddresssMode(false);
  };
  const handleCityResetMode = () => {
    setUpdatedSupplierCity({});
    setResetCityMode(false);
  };
  const handleCountryResetMode = () => {
    setUpdatedSupplierCountry({});
    setResetCountryMode(false);
  };
  const handleSupplierTypeResetMode = () => {
    setUpdatedSupplierSType({});
    setResetSTypeMode(false);
  };

  const handleCancelButton = () => {
    // reset update data
    setUpdatedSupplierCity({});
    setUpdatedSupplierCountry({});
    setUpdatedSupplierSType({});
    setSelectedUpdateSupplier({});
    //
    setSelectedCities([]);
    setShowSupplierUpdateForm(false);
    setShowSupplierTable(true);
    setRenderedData('suppliers-rendered');
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
                      label={
                        updateSupplierCode
                          ? updateSupplierCode
                          : 'Supplier code'
                      }
                      onClick={() => handleCodeResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='name'
                      component={TextField}
                      label={
                        updatedSupplierName
                          ? updatedSupplierName
                          : 'Supplier Name'
                      }
                      onClick={() => handleNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='displayName'
                      component={TextField}
                      label={
                        updatedSupplierDName
                          ? updatedSupplierDName
                          : 'Display Name'
                      }
                      onClick={() => handleDisplayNameResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='address'
                      component={TextField}
                      label={
                        updatedSupplierAddress
                          ? updatedSupplierAddress
                          : 'Address'
                      }
                      onClick={() => handleAdressResetMode()}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      name='selectedCityName'
                      component={Select}
                      formControlProps={{ fullWidth: true }}
                      label={
                        updatedSupplierCity.name
                          ? updatedSupplierCity.name
                          : 'Select a city'
                      }
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
                      formControlProps={{ fullWidth: true }}
                      label={
                        updatedSupplierCountry.name
                          ? updatedSupplierCountry.name
                          : 'Select a Country'
                      }
                      onClick={() => handleCountryResetMode()}
                    >
                      {getCountriesMenu()}
                    </Field>
                  </Grid>
                  <Grid item xs={12} className='Select-supplier-type'>
                    <Field
                      fullWidth
                      name='selectedSupplierTypeName'
                      component={Select}
                      formControlProps={{ fullWidth: true }}
                      label={
                        updatedSupplierSType.name
                          ? updatedSupplierSType.name
                          : 'Select a Supplier Type'
                      }
                      onClick={() => handleSupplierTypeResetMode()}
                    >
                      {getSupplierTypesMenu()}
                    </Field>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 16 }}>
                    <Button
                      className='Form-buttons Cancel-button'
                      variant='contained'
                      type='cancel'
                      onClick={() => {
                        handleCancelButton();
                        setTimeout(() => {
                          form.reset();
                        }, 1000);
                      }}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
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
