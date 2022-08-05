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
import { getData, deleteData } from './helpers';
import CountryCreateForm from './forms-create/CountryCreateForm';

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
  countriesGetURL,
  setCountries,
  countries,
  setRenderedData,
}) {
  const [showCreateForm, setShowCreateForm] = useState(true);
  const countryCreateURL =
    'http://45.130.15.52:6501/api/services/app/Country/Create';
  const countryUpdateURL = `http://45.130.15.52:6501/api/services/app/Country/Update?Id=`;
  const countryDeleteURL = `http://45.130.15.52:6501/api/services/app/Country/Delete?Id=`;

  function handleCountryDelete(id) {
    deleteData(countriesGetURL, setCountries, countryDeleteURL + id);
    setRenderedData('countries-rendered');
  }

  function handleShowCreateForm() {
    setShowCreateForm(false);
  }

  return (
    <div>
      <TableContainer
        component={Paper}
        className={showCreateForm ? 'show' : 'hide'}
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
            {countries.map((country) => (
              <StyledTableRow key={country.id}>
                <StyledTableCell align='left' className='Country-id'>
                  {country.id}
                </StyledTableCell>
                <StyledTableCell align='center'>{country.name}</StyledTableCell>
                <StyledTableCell align='right' className='Buttons'>
                  <Button className='Button Update-button' variant='contained'>
                    UPDATE
                  </Button>
                  <Button
                    className='Button Delete-button'
                    variant='contained'
                    color='error'
                    id={country.id}
                    onClick={(e) => handleCountryDelete(e.target.id)}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CountryCreateForm
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        countryCreateURL={countryCreateURL}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        setRenderedData={setRenderedData}
      />
    </div>
  );
}
