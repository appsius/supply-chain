import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SuppliersTable from './tables/SuppliersTable';
import CountriesTable from './tables/CountriesTable';
import CitiesTable from './tables/CitiesTable';
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
  // forms shown or not
  const [showSupplierCreateForm, setShowSupplierCreateForm] = useState(false);
  const [showSupplierUpdateForm, setShowSupplierUpdateForm] = useState(false);
  const [showCountryCreateForm, setShowCountryCreateForm] = useState(false);
  const [showCountryUpdateForm, setShowCountryUpdateForm] = useState(false);
  const [showCityCreateForm, setShowCityCreateForm] = useState(false);
  const [showCityUpdateForm, setShowCityUpdateForm] = useState(false);
  const [showSupplierTable, setShowSupplierTable] = useState(false);
  const [showCountryTable, setShowCountryTable] = useState(false);
  const [showCityTable, setShowCityTable] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState({
    backgroundColor: 'red',
  });
  const [noSelectedStyles, setNoSelectedStyles] = useState({
    backgroundColor: 'white',
  });

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

  function handleClick(dataUrl, setData, popupState, renderedData) {
    popupState.close();
    setLoading(true);
    getData(dataUrl, setData);
    hideAllForms();
    if (renderedData === 'suppliers-rendered') {
      setNoSelectedStyles({ backgroundColor: 'red' });
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
                  // show | hide forms
                  showSupplierTable={showSupplierTable}
                  setShowSupplierTable={setShowSupplierTable}
                  showSupplierCreateForm={showSupplierCreateForm}
                  setShowSupplierCreateForm={setShowSupplierCreateForm}
                  showSupplierUpdateForm={showSupplierUpdateForm}
                  setShowSupplierUpdateForm={setShowSupplierUpdateForm}
                />
              </div>
            </div>
          )}
          {countries && renderedData === 'countries-rendered' && (
            <div>
              <div className='Tables'>
                <CountriesTable
                  cities={cities}
                  countries={countries}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  setRenderedData={setRenderedData}
                  // show | hide forms
                  showCountryTable={showCountryTable}
                  setShowCountryTable={setShowCountryTable}
                  showCountryCreateForm={showCountryCreateForm}
                  setShowCountryCreateForm={setShowCountryCreateForm}
                  showCountryUpdateForm={showCountryUpdateForm}
                  setShowCountryUpdateForm={setShowCountryUpdateForm}
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
                  suppliers={suppliers}
                  citiesGetURL={citiesGetURL}
                  setCities={setCities}
                  countriesGetURL={countriesGetURL}
                  setCountries={setCountries}
                  setRenderedData={setRenderedData}
                  // show | hide forms
                  showCityTable={showCityTable}
                  setShowCityTable={setShowCityTable}
                  showCityCreateForm={showCityCreateForm}
                  setShowCityCreateForm={setShowCityCreateForm}
                  showCityUpdateForm={showCityUpdateForm}
                  setShowCityUpdateForm={setShowCityUpdateForm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
