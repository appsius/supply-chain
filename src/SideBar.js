import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SuppliersTable from './SuppliersTable';
import CountriesTable from './CountriesTable';
import CitiesTable from './CitiesTable';
import fetchData from './helpers';

export default function SideBar() {
  const suppliersURL = 'http://localhost:3000/suppliers';
  const countriesURL = 'http://localhost:3000/countries';
  const citiesURL = 'http://localhost:3000/cities';

  const [suppliers, setSuppliers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [noDataText, setNoDataText] = useState(
    'Click and choose from Dashboard to see the data of Suppliers, Countries & Cities'
  );
  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    fetchData(suppliersURL, setSuppliers);
    fetchData(countriesURL, setCountries);
    fetchData(citiesURL, setCities);
  }, []);

  function handleSuppliersClick(popupState) {
    setNoDataText('');
    setRenderedData(suppliers);
    popupState.close();
  }

  function handleCountriesClick(popupState) {
    setNoDataText('');
    setRenderedData(countries);
    popupState.close();
  }

  function handleCitiesClick(popupState) {
    setNoDataText('');
    setRenderedData(cities);
    popupState.close();
  }

  return (
    <div className='content'>
      <div className='Sidebar'>
        <div className='Menu'>
          <PopupState variant='popover' popupId='demo-popup-menu'>
            {(popupState) => (
              <React.Fragment>
                <Button variant='contained' {...bindTrigger(popupState)}>
                  Dashboard
                </Button>
                <Menu {...bindMenu(popupState)} className='Menu-list'>
                  <MenuItem onClick={() => handleSuppliersClick(popupState)}>
                    Suppliers
                  </MenuItem>
                  <MenuItem onClick={() => handleCountriesClick(popupState)}>
                    Countries
                  </MenuItem>
                  <MenuItem onClick={() => handleCitiesClick(popupState)}>
                    Cities
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
        <div className='Table'>
          {noDataText && <div className='no-data-text'>{noDataText}</div>}
          {suppliers && renderedData === suppliers && (
            <div>
              <div className='Tables'>
                <SuppliersTable suppliers={suppliers} />
              </div>
            </div>
          )}
          {countries && renderedData === countries && (
            <div>
              <div className='Tables'>
                <CountriesTable countries={countries} />
              </div>
            </div>
          )}
          {cities && renderedData === cities && (
            <div>
              <div className='Tables'>
                <CitiesTable cities={cities} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
