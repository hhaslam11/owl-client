import React from "react";
import { useState } from 'react';

// Material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';

import Sidebar from '../Sidebar';
import InboxListItem from '../Inbox/InboxListItem';
import './Inbox.scss';
// import './InboxListItem.scss';

//This is just driver data, it will eventually be
//generated based off api data
const list = (
  <List>
    <InboxListItem 
      username="CoolOwl"
      country="Burundi"
      flag="https://restcountries.eu/data/bdi.svg"
      unread
    />
    <InboxListItem 
      username="hhaslam11"
      country="Canada"
      flag="https://restcountries.eu/data/can.svg"
      unread
    />
    <InboxListItem 
      username="Grid1985"
      country="Mauritania"
      flag="https://restcountries.eu/data/mrt.svg"
      unread
    />
    <InboxListItem 
      username="Abong1965"
      country="Czechia"
      flag="https://restcountries.eu/data/cze.svg"
    />
    <InboxListItem 
      username="Alaines"
      country="Nepal"
      flag="https://restcountries.eu/data/npl.svg"
    />
    <InboxListItem 
      username="Aries"
      country="Germany"
      flag="https://restcountries.eu/data/deu.svg"
    />
    <InboxListItem 
      username="Thiect"
      country="Austria"
      flag="https://restcountries.eu/data/aut.svg"
    />
    <ListItem 
      username="Shapid"
      country="Chile"
      flag="https://restcountries.eu/data/chl.svg"
    />
    <InboxListItem 
      username="ChloePrice2"
      country="Cook Islands"
      flag="https://restcountries.eu/data/cok.svg"
    />
  </List>
)


export default function Inbox(props) {
  return (
    <Sidebar
      isOpen
      permanent
      listItems={list}
      anchor="left"
      width="300px"
    />
  )
}