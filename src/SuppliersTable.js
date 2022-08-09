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
import SupplierUpdateForm from './forms-update/SupplierUpdateForm';

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
  // show|hide forms or table
  showSupplierTable,
  setShowSupplierTable,
  showSupplierCreateForm,
  setShowSupplierCreateForm,
  showSupplierUpdateForm,
  setShowSupplierUpdateForm,
}) {
  const supplierCreateURL =
    'http://45.130.15.52:6501/api/services/app/Supplier/Create';
  const supplierUpdateURL = `http://45.130.15.52:6501/api/services/app/Supplier/Update`;
  const supplierDeleteURL = `http://45.130.15.52:6501/api/services/app/Supplier/Delete?Id=`;
  const [selectedUpdateSupplier, setSelectedUpdateSupplier] = useState({});

  // validation reset controllers
  const [resetCodeMode, setResetCodeMode] = useState(false);
  const [resetNameMode, setResetNameMode] = useState(false);
  const [resetDNameMode, setResetDNameMode] = useState(false);
  const [resetAddressMode, setResetAddresssMode] = useState(false);
  const [resetCityMode, setResetCityMode] = useState(false);
  const [resetCountryMode, setResetCountryMode] = useState(false);
  const [resetSTypeMode, setResetSTypeMode] = useState(false);

  const openSupplierForm = () => {
    // validation modes
    setResetCodeMode(true);
    setResetNameMode(true);
    setResetDNameMode(true);
    setResetAddresssMode(true);
    setResetCityMode(true);
    setResetCountryMode(true);
    setResetSTypeMode(true);
    // hide-show table and forms
    setShowSupplierTable(false);
    setShowSupplierUpdateForm(false);
    setShowSupplierCreateForm(true);
  };

  function handleSupplierUpdate(supplier) {
    setSelectedUpdateSupplier(supplier);
    // hide-show table and forms
    setShowSupplierTable(false);
    setShowSupplierCreateForm(false);
    setShowSupplierUpdateForm(true);
  }

  const handleSupplierDelete = (id) => {
    deleteData(suppliersGetURL, setSuppliers, supplierDeleteURL + id);
    setShowSupplierTable(true);
    setRenderedData('suppliers-rendered');
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        className={showSupplierTable ? 'show' : 'hide'}
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
              const { id, supplierType, code, name, address, city, country } =
                supplier;
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
                    {city ? city.name : 'City not found'}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {city ? city.country.name : 'Country not found'}
                  </StyledTableCell>
                  <StyledTableCell align='right' className='Buttons'>
                    <Button
                      className='Button Update-button'
                      variant='contained'
                      onClick={() => handleSupplierUpdate(supplier)}
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
        setRenderedData={setRenderedData}
        // validation reset modes
        resetCodeMode={resetCodeMode}
        resetNameMode={resetNameMode}
        resetDNameMode={resetDNameMode}
        resetAddressMode={resetAddressMode}
        resetCityMode={resetCityMode}
        resetCountryMode={resetCountryMode}
        resetSTypeMode={resetSTypeMode}
        setResetCodeMode={setResetCodeMode}
        setResetNameMode={setResetNameMode}
        setResetDNameMode={setResetDNameMode}
        setResetAddresssMode={setResetAddresssMode}
        setResetCityMode={setResetCityMode}
        setResetCountryMode={setResetCountryMode}
        setResetSTypeMode={setResetSTypeMode}
        // show|hide country create form or table
        setShowSupplierTable={setShowSupplierTable}
        showSupplierCreateForm={showSupplierCreateForm}
        setShowSupplierCreateForm={setShowSupplierCreateForm}
      />
      <SupplierUpdateForm
        countries={countries}
        cities={cities}
        suppliersGetURL={suppliersGetURL}
        setSuppliers={setSuppliers}
        selectedUpdateSupplier={selectedUpdateSupplier}
        supplierUpdateURL={supplierUpdateURL}
        // showCreateForm={showCreateForm}
        // setShowCreateForm={setShowCreateForm}
        setRenderedData={setRenderedData}
        // validation reset modes
        resetCodeMode={resetCodeMode}
        resetNameMode={resetNameMode}
        resetDNameMode={resetDNameMode}
        resetAddressMode={resetAddressMode}
        resetCityMode={resetCityMode}
        resetCountryMode={resetCountryMode}
        resetSTypeMode={resetSTypeMode}
        setResetCodeMode={setResetCodeMode}
        setResetNameMode={setResetNameMode}
        setResetDNameMode={setResetDNameMode}
        setResetAddresssMode={setResetAddresssMode}
        setResetCityMode={setResetCityMode}
        setResetCountryMode={setResetCountryMode}
        setResetSTypeMode={setResetSTypeMode}
        // show|hide country create form or table
        setShowSupplierTable={setShowSupplierTable}
        showSupplierUpdateForm={showSupplierUpdateForm}
        setShowSupplierUpdateForm={setShowSupplierUpdateForm}
      />
    </div>
  );
}
