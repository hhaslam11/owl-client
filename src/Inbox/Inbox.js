import React from "react";

// Material ui
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import InboxListItem from '../Inbox/InboxListItem';

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
    <InboxListItem 
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
//END DRIVER DATA
//🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉🦉

const drawerWidth = '300px';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Inbox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar
        permanent
        listItems={list}
        anchor="left"
        width={drawerWidth}
      />
      <main className={classes.content}>
        <h1>ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>
      </main>
    </div>
  )
}