import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button } from '@mui/material';
import { deleteData } from '../helpers';
import CityCreateForm from '../forms-create/CityCreateForm';
import CityUpdateForm from '../forms-update/CityUpdateForm';

// table rows styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CitiesTable({
  // cities data
  cities,
  countries,
  suppliers,
  citiesGetURL,
  setCities,
  countriesGetURL,
  setCountries,
  // show/hide table or form
  showCityTable,
  setShowCityTable,
  showCityCreateForm,
  setShowCityCreateForm,
  showCityUpdateForm,
  setShowCityUpdateForm,
  setRenderedData,
}) {
  // city post/update/delete URLs
  const cityCreateURL = 'http://45.130.15.52:6501/api/services/app/City/Create';
  const cityUpdateURL = 'http://45.130.15.52:6501/api/services/app/City/Update';
  const cityDeleteURL =
    'http://45.130.15.52:6501/api/services/app/City/Delete?Id=';
  // selected city update data
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedCityCountryName, setSelectedCityCountryName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertCityName, setAlertCityName] = useState('');
  // validation reset controllers
  const [cityResetMode, setCityResetMode] = useState(false);
  const [resetMode, setResetMode] = useState(true);

  function openCityForm() {
    // set validation modes
    // not show validation errors when open create form
    setCityResetMode(true);
    setResetMode(true);
    // hide table and show create form
    setShowCityTable(false);
    setShowCityUpdateForm(false);
    setShowCityCreateForm(true);
  }

  function handleCityUpdate(city) {
    // selected city data
    const countryOfCity = countries.filter(
      (country) => country.id === city.countryId
    );
    setSelectedCity(city);
    setSelectedCityName(city.name);
    setSelectedCityCountryName(countryOfCity[0].name);
    // set validation modes
    // not show validation errors when open update form
    setCityResetMode(true);
    setResetMode(true);
    // hide table and show update form
    setShowCityTable(false);
    setShowCityCreateForm(false);
    setShowCityUpdateForm(true);
  }

  function handleCityDelete(city) {
    // Alert - do not delete city if has suppliers
    const supplierCity = suppliers.filter(
      (supplier) => supplier.city && supplier.city.name === city.name
    );
    if (supplierCity.length > 0) {
      setAlertCityName(city.name);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      deleteData(citiesGetURL, setCities, cityDeleteURL + city.id);
      setShowCityTable(true);
      setRenderedData('cities-rendered');
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {showAlert && (
        <Alert
          variant='filled'
          severity='error'
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            left: '49.5%',
            top: '-4.5vh',
            transform: 'translate(-50%, -50%)',
            width: '88vw',
            height: '5.5vh',
            borderRadius: 0,
            backgroundColor: 'red',
            fontSize: '1rem',
            fontWeight: 'lighter',
            letterSpacing: '1.25px',
          }}
        >
          {alertCityName} has suppliers, update|delete them first!
        </Alert>
      )}
      <TableContainer
        component={Paper}
        className={showCityTable ? 'show' : 'hide'}
      >
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>ID</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Country</StyledTableCell>
              <StyledTableCell align='right' className='City-table-buttons'>
                <Button
                  className='Button Insert-button'
                  variant='contained'
                  color='success'
                  onClick={() => openCityForm()}
                >
                  NEW CITY
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => {
              if (!city.id || !city.name || !city.countryId) return false;
              return (
                <StyledTableRow key={city.id}>
                  <StyledTableCell align='left'>{city.id}</StyledTableCell>
                  <StyledTableCell align='center'>{city.name}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {city.country ? city.country.name : 'Name-Not-Found!'}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Button
                      className='Button Update-button'
                      variant='contained'
                      onClick={() => handleCityUpdate(city)}
                    >
                      UPDATE
                    </Button>
                    <Button
                      className='Button Delete-button'
                      variant='contained'
                      color='error'
                      id={city.id}
                      onClick={() => handleCityDelete(city)}
                    >
                      DELETE
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CityCreateForm
        // cities data
        cities={cities}
        countries={countries}
        citiesGetURL={citiesGetURL}
        setCities={setCities}
        cityCreateURL={cityCreateURL}
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        // validation reset modes
        cityResetMode={cityResetMode}
        setCityResetMode={setCityResetMode}
        resetMode={resetMode}
        setResetMode={setResetMode}
        // hide table, show create form
        setShowCityTable={setShowCityTable}
        showCityCreateForm={showCityCreateForm}
        setShowCityCreateForm={setShowCityCreateForm}
        setRenderedData={setRenderedData}
      />
      <CityUpdateForm
        // cities data
        cities={cities}
        countries={countries}
        citiesGetURL={citiesGetURL}
        setCities={setCities}
        cityUpdateURL={cityUpdateURL}
        // selected city update data
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedCityName={selectedCityName}
        setSelectedCityName={setSelectedCityName}
        selectedCityCountryName={selectedCityCountryName}
        setSelectedCityCountryName={setSelectedCityCountryName}
        // validation reset modes
        cityResetMode={cityResetMode}
        setCityResetMode={setCityResetMode}
        resetMode={resetMode}
        setResetMode={setResetMode}
        // hide table, show update form
        setShowCityTable={setShowCityTable}
        showCityUpdateForm={showCityUpdateForm}
        setShowCityUpdateForm={setShowCityUpdateForm}
        setRenderedData={setRenderedData}
      />
    </div>
  );
}
