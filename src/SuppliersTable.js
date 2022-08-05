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
import SupplierCreateForm from './forms-create/SupplierCreateForm';
import { deleteData } from './helpers';

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

export default function SuppliersTable({
  suppliers,
  countries,
  cities,
  suppliersGetURL,
  setSuppliers,
  countriesGetURL,
  setCountries,
  citiesGetURL,
  setCities,
  setRenderedData,
}) {
  const [showCreateForm, setShowCreateForm] = useState(true);
  const supplierCreateURL =
    'http://45.130.15.52:6501/api/services/app/Supplier/Create';
  // const supplierUpdateURL = `http://45.130.15.52:6501/api/services/app/Supplier/Update?Id=`;
  const supplierDeleteURL = `http://45.130.15.52:6501/api/services/app/Supplier/Delete?Id=`;

  function openSupplierForm() {
    setShowCreateForm(false);
  }

  function handleSupplierDelete(id) {
    deleteData(suppliersGetURL, setSuppliers, supplierDeleteURL + id);
    setRenderedData('supplier-rendered');
  }

  return (
    <div>
      <TableContainer
        component={Paper}
        className={showCreateForm ? 'show' : 'hide'}
        // className={'Table ' + showCreateForm ? 'show' : 'hide'}
      >
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>ID</StyledTableCell>
              <StyledTableCell align='center'>Supplier Type</StyledTableCell>
              <StyledTableCell align='center'>Code</StyledTableCell>
              <StyledTableCell align='center'>Name</StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Country</StyledTableCell>
              <StyledTableCell align='center'>City</StyledTableCell>
              <StyledTableCell align='right' className='Buttons'>
                <Button
                  className='Button Insert-button'
                  variant='contained'
                  color='success'
                  onClick={() => openSupplierForm()}
                >
                  NEW SUPPLIER
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => {
              const { id, supplierType, code, name, address, city } = supplier;
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell align='left'>{id}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {supplierType.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>{code}</StyledTableCell>
                  <StyledTableCell align='center'>{name}</StyledTableCell>
                  <StyledTableCell align='center'>{address}</StyledTableCell>
                  <StyledTableCell align='center'>
                    {city ? city.country.name : 'City not found'}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {city ? city.name : 'Country not found'}
                  </StyledTableCell>
                  <StyledTableCell align='right' className='Buttons'>
                    <Button
                      className='Button Update-button'
                      variant='contained'
                    >
                      UPDATE
                    </Button>
                    <Button
                      className='Button Delete-button'
                      variant='contained'
                      color='error'
                      id={id}
                      onClick={(e) => handleSupplierDelete(e.target.id)}
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
      <SupplierCreateForm
        countries={countries}
        cities={cities}
        suppliersGetURL={suppliersGetURL}
        setSuppliers={setSuppliers}
        supplierCreateURL={supplierCreateURL}
        countriesGetURL={countriesGetURL}
        setCountries={setCountries}
        citiesGetURL={citiesGetURL}
        setCities={setCities}
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        setRenderedData={setRenderedData}
      />
    </div>
  );
}
