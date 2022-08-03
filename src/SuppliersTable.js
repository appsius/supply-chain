import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

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

export default function SuppliersTable({ suppliers }) {
  return (
    <TableContainer component={Paper} className='Table'>
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
              >
                NEW SUPPLIER
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <StyledTableRow key={supplier.id}>
              <StyledTableCell align='left'>{supplier.id}</StyledTableCell>
              <StyledTableCell align='center'>
                {supplier.supplierType.name}
              </StyledTableCell>
              <StyledTableCell align='center'>{supplier.code}</StyledTableCell>
              <StyledTableCell align='center'>{supplier.name}</StyledTableCell>
              <StyledTableCell align='center'>
                {supplier.address}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {supplier.city.country.name}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {supplier.city.name}
              </StyledTableCell>
              <StyledTableCell align='right' className='Buttons'>
                <Button className='Button Update-button' variant='contained'>
                  UPDATE
                </Button>
                <Button
                  className='Button Delete-button'
                  variant='contained'
                  color='error'
                >
                  DELETE
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
