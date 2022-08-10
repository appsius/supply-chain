import React, { useState } from 'react';
import styled from '@mui/material/styles/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { deleteData } from './helpers';
import CountryUpdateForm from './forms-update/CountryUpdateForm';
import CountryCreateForm from './forms-create/CountryCreateForm';
import { Alert } from '@mui/material';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CountriesTable({
  cities,
  countries,
  countriesGetURL,
  setCountries,
  setRenderedData,
  // show|hide forms or table
  showCountryTable,
  setShowCountryTable,
  showCountryCreateForm,
  setShowCountryCreateForm,
  showCountryUpdateForm,
  setShowCountryUpdateForm,
}) {
  const countryCreateURL =
    'http://45.130.15.52:6501/api/services/app/Country/Create';
  const countryUpdateURL =
    'http://45.130.15.52:6501/api/services/app/Country/Update';
  const countryDeleteURL =
    'http://45.130.15.52:6501/api/services/app/Country/Delete?Id=';
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [resetMode, setResetMode] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertCountryName, setAlertCountryName] = useState('');

  function handleShowCreateForm() {
    setResetMode(true);
    // hide-show table and forms
    setShowCountryTable(false);
    setShowCountryUpdateForm(false);
    setShowCountryCreateForm(true);
  }

  function handleCountryUpdate(country) {
    setSelectedCountry(country);
    setSelectedCountryName(country.name);
    setResetMode(true);
    // hide-show table and forms
    setShowCountryTable(false);
    setShowCountryCreateForm(false);
    setShowCountryUpdateForm(true);
  }

  function handleCountryDelete(country) {
    const { id, name } = country;
    const citiesOfCountry = cities.filter(
      (city) => city.countryId === Number(id)
    );
    if (citiesOfCountry.length > 0) {
      // set alert to not delete country/has city
      setAlertCountryName(name);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      deleteData(countriesGetURL, setCountries, countryDeleteURL + id);
      setShowCountryTable(true);
      setRenderedData('countries-rendered');
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
            left: '45%',
            top: '-4.5vh',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '5.5vh',
            borderRadius: 0,
            backgroundColor: 'red',
            color: 'white',
            fontSize: '1.65rem',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
          }}
        >
          {alertCountryName} has cities, update|delete them first!
        </Alert>
      )}
      <TableContainer
        component={Paper}
        className={'TableContainer' && showCountryTable ? 'show' : 'hide'}
      >
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>ID</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='right' className='Buttons'>
                <Button
                  className='Button Insert-button'
                  variant='contained'
                  color='success'
                  onClick={() => handleShowCreateForm()}
                >
                  NEW COUNTRY
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => {
              const { id, name } = country;
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell align='left' className='Country-id'>
                    {id}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{name}</StyledTableCell>
                  <StyledTableCell align='right' className='Buttons'>
                    <Button
                      className='Button Update-button'
                      variant='contained'
                      onClick={() => handleCountryUpdate(country)}
                    >
                      UPDATE
                    </Button>
                    <Button
                      className='Button Delete-button'
                      variant='contained'
                      color='error'
                      id={id}
                      onClick={() => handleCountryDelete(country)}
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
      <CountryCreateForm
        countries={countries}
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        countryCreateURL={countryCreateURL}
        resetMode={resetMode}
        setResetMode={setResetMode}
        setRenderedData={setRenderedData}
        // show|hide country create form or table
        setShowCountryTable={setShowCountryTable}
        showCountryCreateForm={showCountryCreateForm}
        setShowCountryCreateForm={setShowCountryCreateForm}
      />
      <CountryUpdateForm
        countries={countries}
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        // selected country data for filling labels
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCountryName={selectedCountryName}
        setSelectedCountryName={setSelectedCountryName}
        //
        countryUpdateURL={countryUpdateURL}
        resetMode={resetMode}
        setResetMode={setResetMode}
        setRenderedData={setRenderedData}
        // show|hide country update form or table
        setShowCountryTable={setShowCountryTable}
        showCountryUpdateForm={showCountryUpdateForm}
        setShowCountryUpdateForm={setShowCountryUpdateForm}
      />
    </div>
  );
}
