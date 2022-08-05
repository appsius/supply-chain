import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { deleteData } from './helpers';
import CityCreateForm from './forms-create/CityCreateForm';

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
  cities,
  countries,
  citiesGetURL,
  setCities,
  countriesGetURL,
  setCountries,
  setRenderedData,
}) {
  const [showCreateForm, setShowCreateForm] = useState(true);
  const cityCreateURL = 'http://45.130.15.52:6501/api/services/app/City/Create';
  // const cityUpdateURL = `http://45.130.15.52:6501/api/services/app/City/Update?Id=`;
  const cityDeleteURL = `http://45.130.15.52:6501/api/services/app/City/Delete?Id=`;

  function handleCityDelete(id) {
    deleteData(citiesGetURL, setCities, cityDeleteURL + id);
    setRenderedData('cities-rendered');
  }

  function openCityForm() {
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
              <StyledTableCell align='center'>Country</StyledTableCell>
              <StyledTableCell align='right' className='Buttons'>
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
            {cities.map((city) => (
              <StyledTableRow key={city.id}>
                <StyledTableCell>{city.id}</StyledTableCell>
                <StyledTableCell align='center'>{city.name}</StyledTableCell>
                <StyledTableCell align='center'>
                  {city.country ? city.country.name : 'Name-Not-Found!'}
                </StyledTableCell>
                <StyledTableCell align='right' className='Buttons'>
                  <Button className='Button Update-button' variant='contained'>
                    UPDATE
                  </Button>
                  <Button
                    className='Button Delete-button'
                    variant='contained'
                    color='error'
                    id={city.id}
                    onClick={(e) => handleCityDelete(e.target.id)}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CityCreateForm
        countries={countries}
        citiesGetURL={citiesGetURL}
        setCities={setCities}
        cityCreateURL={cityCreateURL}
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        setRenderedData={setRenderedData}
      />
    </div>
  );
}
