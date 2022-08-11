import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { getData } from './helpers';
import SuppliersTable from './tables/SuppliersTable';
import CountriesTable from './tables/CountriesTable';
import CitiesTable from './tables/CitiesTable';

export default function SideBar() {
  // if no data cond.
  const noDataText =
    'Click from Dashboard to see Suppliers, Countries & Cities data';
  const [loading, setLoading] = useState(false);
  // get data URLs
  const suppliersGetURL =
    'http://45.130.15.52:6501/api/services/app/Supplier/GetAll';
  const countriesGetURL =
    'http://45.130.15.52:6501/api/services/app/Country/GetAll';
  const citiesGetURL = 'http://45.130.15.52:6501/api/services/app/City/GetAll';
  // data to fetch
  const [suppliers, setSuppliers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  // hide forms and table
  const [showSupplierCreateForm, setShowSupplierCreateForm] = useState(false);
  const [showSupplierUpdateForm, setShowSupplierUpdateForm] = useState(false);
  const [showCountryCreateForm, setShowCountryCreateForm] = useState(false);
  const [showCountryUpdateForm, setShowCountryUpdateForm] = useState(false);
  const [showCityCreateForm, setShowCityCreateForm] = useState(false);
  const [showCityUpdateForm, setShowCityUpdateForm] = useState(false);
  const [showSupplierTable, setShowSupplierTable] = useState(false);
  const [showCountryTable, setShowCountryTable] = useState(false);
  const [showCityTable, setShowCityTable] = useState(false);
  const [renderedData, setRenderedData] = useState('');

  useEffect(() => {
    getData(suppliersGetURL, setSuppliers);
    getData(countriesGetURL, setCountries);
    getData(citiesGetURL, setCities);
  }, []);

  function hideAllForms() {
    setShowSupplierCreateForm(false);
    setShowSupplierUpdateForm(false);
    setShowCountryCreateForm(false);
    setShowCountryUpdateForm(false);
    setShowCityCreateForm(false);
    setShowCityUpdateForm(false);
  }

  // fetch data function
  function handleClick(dataUrl, setData, popupState, renderedData) {
    popupState.close();
    setLoading(true);
    getData(dataUrl, setData);
    hideAllForms();
    if (renderedData === 'suppliers-rendered') {
      setShowSupplierTable(true);
      setRenderedData('suppliers-rendered');
    } else if (renderedData === 'countries-rendered') {
      setShowCountryTable(true);
      setRenderedData('countries-rendered');
    } else if (renderedData === 'cities-rendered') {
      setShowCityTable(true);
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
                    className={
                      renderedData === 'suppliers-rendered'
                        ? 'Menu-list-item Menu-list-item-rendered'
                        : 'Menu-list-item'
                    }
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
                    className={
                      renderedData === 'countries-rendered'
                        ? 'Menu-list-item Menu-list-item-rendered'
                        : 'Menu-list-item'
                    }
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
                    className={
                      renderedData === 'cities-rendered'
                        ? 'Menu-list-item Menu-list-item-rendered'
                        : 'Menu-list-item'
                    }
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
                  // suppliers data
                  suppliers={suppliers}
                  countries={countries}
                  cities={cities}
                  suppliersGetURL={suppliersGetURL}
                  setSuppliers={setSuppliers}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  // show/hide supplier forms and table
                  showSupplierTable={showSupplierTable}
                  setShowSupplierTable={setShowSupplierTable}
                  showSupplierCreateForm={showSupplierCreateForm}
                  setShowSupplierCreateForm={setShowSupplierCreateForm}
                  showSupplierUpdateForm={showSupplierUpdateForm}
                  setShowSupplierUpdateForm={setShowSupplierUpdateForm}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {countries && renderedData === 'countries-rendered' && (
            <div>
              <div className='Tables'>
                <CountriesTable
                  // countries data
                  cities={cities}
                  countries={countries}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  // show/hide country forms and table
                  showCountryTable={showCountryTable}
                  setShowCountryTable={setShowCountryTable}
                  showCountryCreateForm={showCountryCreateForm}
                  setShowCountryCreateForm={setShowCountryCreateForm}
                  showCountryUpdateForm={showCountryUpdateForm}
                  setShowCountryUpdateForm={setShowCountryUpdateForm}
                  setRenderedData={setRenderedData}
                />
              </div>
            </div>
          )}
          {cities && renderedData === 'cities-rendered' && (
            <div>
              <div className='Tables'>
                <CitiesTable
                  // cities data
                  cities={cities}
                  countries={countries}
                  suppliers={suppliers}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  // show/hide city forms and table
                  showCityTable={showCityTable}
                  setShowCityTable={setShowCityTable}
                  showCityCreateForm={showCityCreateForm}
                  setShowCityCreateForm={setShowCityCreateForm}
                  showCityUpdateForm={showCityUpdateForm}
                  setShowCityUpdateForm={setShowCityUpdateForm}
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
