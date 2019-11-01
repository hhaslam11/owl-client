import React from "react";

// Material ui
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import InboxListItem from '../Inbox/InboxListItem';
import { TextareaAutosize } from "@material-ui/core";

import "./Inbox.scss"

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
const contentWidth = '55%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: "100vh"
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

      {/* This is to make the sidebar actually take up space (otherwise content will hide behind it) */}
      <div style={{width: drawerWidth}}>
        <Sidebar
          permanent
          listItems={list}
          anchor="left"
          width={drawerWidth}
        />
      </div>
      <main className={classes.content}>
        <Container style={{ width: contentWidth }}>
          <Typography variant="h4">hhaslam11</Typography>
          <Typography variant="subtitle2">Canada</Typography>
          <p>
            Nulla efficitur odio sed metus pellentesque tristique. Nunc est sem, suscipit vitae erat ac, malesuada euismod metus. Morbi scelerisque elementum arcu sit amet consectetur.
          </p>
        </Container>
        <Divider />
        <Container style={{ width: contentWidth }}>
          <Typography variant="h4" className="reply-header">Reply</Typography>
          <TextareaAutosize placeholder="Write your letter..." className="reply" />
        </Container>
      </main>
    </div>
  )
}