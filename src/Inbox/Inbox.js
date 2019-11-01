import React from "react";
import { useState } from 'react';

// Material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';

import Sidebar from '../Sidebar';

import './Inbox.scss';

//This is just driver data, it will eventually be
//generated based off api data
const list = (
  <List>
    <ListItem button>
    <Badge color="secondary" variant="dot">
      <ListItemAvatar>
        <img className="flag" alt="Burundi Flag" src="https://restcountries.eu/data/bdi.svg" />
      </ListItemAvatar>
      <ListItemText primary="CoolOwl" secondary="Burundi" />
    </Badge>
    </ListItem>

    <ListItem button>
    <Badge color="secondary" variant="dot">
      <ListItemAvatar>
        <img className="flag" alt="Canada Flag" src="https://restcountries.eu/data/can.svg" />
      </ListItemAvatar>
      <ListItemText primary="hhaslam11" secondary="Canada" />
    </Badge>
    </ListItem>

    <ListItem button>
    <Badge color="secondary" variant="dot">
      <ListItemAvatar>
        <img className="flag" alt="Mauritania Flag" src="https://restcountries.eu/data/mrt.svg" />
      </ListItemAvatar>
      <ListItemText primary="Grid1985" secondary="Mauritania" />
    </Badge>
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Czechia Flag" src="https://restcountries.eu/data/cze.svg" />
      </ListItemAvatar>
      <ListItemText primary="Abong1965" secondary="Czechia" />
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Nepal Flag" src="https://restcountries.eu/data/npl.svg" />
      </ListItemAvatar>
      <ListItemText primary="Alaines" secondary="Nepal" />
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Kenya Flag" src="https://restcountries.eu/data/ken.svg" />
      </ListItemAvatar>
      <ListItemText primary="Pand1979" secondary="Kenya" />
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Germany Flag" src="https://restcountries.eu/data/deu.svg" />
      </ListItemAvatar>
      <ListItemText primary="Aries" secondary="Germany" />
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Austria Flag" src="https://restcountries.eu/data/aut.svg" />
      </ListItemAvatar>
      <ListItemText primary="Thiect" secondary="Austria" />
    </ListItem>

    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Chile Flag" src="https://restcountries.eu/data/chl.svg" />
      </ListItemAvatar>
      <ListItemText primary="Shapid" secondary="Chile" />
    </ListItem>
    
    <ListItem button>
      <ListItemAvatar>
        <img className="flag" alt="Cook Islands Flag" src="https://restcountries.eu/data/cok.svg" />
      </ListItemAvatar>
      <ListItemText primary="ChloePrice2" secondary="Cook Islands" />
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