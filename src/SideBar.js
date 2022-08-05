import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SuppliersTable from './SuppliersTable';
import CountriesTable from './CountriesTable';
import CitiesTable from './CitiesTable';
import { getData } from './helpers';

export default function SideBar() {
  const noDataText =
    'Click from Dashboard to see Suppliers, Countries & Cities data';
  const [loading, setLoading] = useState(false);
  const suppliersGetURL =
    'http://45.130.15.52:6501/api/services/app/Supplier/GetAll';
  const countriesGetURL =
    'http://45.130.15.52:6501/api/services/app/Country/GetAll';
  const citiesGetURL = 'http://45.130.15.52:6501/api/services/app/City/GetAll';
  const [suppliers, setSuppliers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [renderedData, setRenderedData] = useState('');

  useEffect(() => {
    getData(suppliersGetURL, setSuppliers);
    getData(countriesGetURL, setCountries);
    getData(citiesGetURL, setCities);
  }, []);

  function handleClick(dataUrl, setData, popupState, renderedData) {
    popupState.close();
    setLoading(true);
    getData(dataUrl, setData);

    if (renderedData === 'suppliers-rendered') {
      setRenderedData('suppliers-rendered');
    } else if (renderedData === 'countries-rendered') {
      setRenderedData('countries-rendered');
    } else if (renderedData === 'cities-rendered') {
      setRenderedData('cities-rendered');
    }
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
                  <MenuItem
                    className='Menu-list-item'
                    onClick={() =>
                      handleClick(
                        suppliersGetURL,
                        setSuppliers,
                        popupState,
                        'suppliers-rendered'
                      )
                    }
                  >
                    Suppliers
                  </MenuItem>
                  <MenuItem
                    className='Menu-list-item'
                    onClick={() =>
                      handleClick(
                        countriesGetURL,
                        setCountries,
                        popupState,
                        'countries-rendered'
                      )
                    }
                  >
                    Countries
                  </MenuItem>
                  <MenuItem
                    className='Menu-list-item'
                    onClick={() =>
                      handleClick(
                        citiesGetURL,
                        setCities,
                        popupState,
                        'cities-rendered'
                      )
                    }
                  >
                    Cities
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </div>
        <div className='Table'>
          {!loading && <div className='no-data-text'>{noDataText}</div>}
          {suppliers && renderedData === 'suppliers-rendered' && (
            <div>
              <div className='Tables'>
                <SuppliersTable
                  suppliers={suppliers}
                  countries={countries}
                  cities={cities}
                  suppliersGetURL={suppliersGetURL}
                  setSuppliers={setSuppliers}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {countries && renderedData === 'countries-rendered' && (
            <div>
              <div className='Tables'>
                <CountriesTable
                  countries={countries}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {cities && renderedData === 'cities-rendered' && (
            <div>
              <div className='Tables'>
                <CitiesTable
                  cities={cities}
                  countries={countries}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
