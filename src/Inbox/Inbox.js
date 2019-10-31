import React from "react";
import { useState } from 'react';

// Material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Sidebar from '../Sidebar';

import './Inbox.scss';

//This is just driver data, it will eventually be
//generated based off api data
const list = (
  <List>
    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Burundi Flag" src="https://restcountries.eu/data/bdi.svg" />
      </ListItemAvatar>
      <ListItemText primary="hhaslam11" secondary="Burundi" />
    </ListItem>
    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Canada Flag" src="https://restcountries.eu/data/can.svg" />
      </ListItemAvatar>
      <ListItemText primary="CoolOwl" secondary="Canada" />
    </ListItem>
    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Mauritania Flag" src="https://restcountries.eu/data/mrt.svg" />
      </ListItemAvatar>
      <ListItemText primary="Grid1985" secondary="Mauritania" />
    </ListItem>
    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Czechia Flag" src="https://restcountries.eu/data/cze.svg" />
      </ListItemAvatar>
      <ListItemText primary="Abong1965" secondary="Czechia" />
    </ListItem>
  </List>
)


export default function Inbox(props) {
  return (
    <Sidebar
      isOpen
      listItems={list}
      anchor="left"
    />
  )
}