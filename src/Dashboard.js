import React from 'react';
import { useState } from 'react';

// import './Dashboard.scss';

//Material UI components
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import PublicIcon from '@material-ui/icons/Public';

import Navigation from './Navigation';
import Sidebar from './Sidebar';
import Map from './Map';


const navMenu = (
  <MenuList>
    <MenuItem>Inbox</MenuItem>
    <MenuItem>Post Office</MenuItem>
    <MenuItem>Logout</MenuItem>
  </MenuList>
)

export default function Dashboard() {

  const [state, setState] = useState({
    open: false,
    selected: null,
    countryName: null
  });

  const onCountryClick = event => {
    setState({
      ...state,
      selected: event.target.dataItem.dataContext.id,
      countryName: event.target.dataItem.dataContext.name
    });
  };

  const countryInfo = (
    <div
      role="presentation"
    >
      <List>
        <ListItem>
          <ListItemIcon><PublicIcon /></ListItemIcon>
          <ListItemText primary={state.countryName} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="Send letter" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <Navigation
        title="Owl"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <Sidebar 
        isOpen={state.selected}
        displayUnderNavigation
        onClose={() => {setState({ ...state, selected: null, countryName: null })}}
        listItems={countryInfo}
        width="250px"
        backgroundColor="#f2f0f0"
      />
      <Map
        color="#358c4b"
        colorOnHover="#286b39"
        onCountryClick={onCountryClick}
        data={[{
          id: state.selected,
          fill: "#286b39"
        }]}
      />
    </>
  );
}