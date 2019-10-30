import React from 'react';

import './App.scss';

//Material UI components
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import Navigation from './Navigation'
import Map from './Map'
import Sidebar from './Sidebar'
import Register from './Register'
import Login from './Login'


const navMenu = (
  <MenuList>
    <MenuItem>Inbox</MenuItem>
    <MenuItem>Post Office</MenuItem>
    <MenuItem>Logout</MenuItem>
  </MenuList>
)

function App() {
  return (
    <>
      <Navigation
        title="Owl"
        backgroundColor="#043565"
        menuList={navMenu}
      />
      
      <Map
        color="#043565"
        colorOnHover="#5158bb"
      />
    </>
  );
}

export default App;
