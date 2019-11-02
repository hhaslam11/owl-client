import React from 'react';
import { useState, useEffect } from 'react';

// Material ui
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import InboxListItem from '../Inbox/InboxListItem';
import { TextareaAutosize, Button, CircularProgress, Grid } from "@material-ui/core";

import "./Inbox.scss"
import axios from "axios";

const API_SERVER = '//192.168.88.49:3000';
const drawerWidth = '300px';

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

const getData = id => {
  return axios.get(`${API_SERVER}/users/${id}/letters`)
    .then(res => {
      const received_letters = res.data.data.received_letters;
      // const sent_letters     = res.data.data.sent_letters;

      const inboxList = received_letters.map(el => (
        <InboxListItem 
          username={el.sender.username}
          country={el.sender.country.name}
          flag={el.sender.country.flag_image}
          unread={!el.read}
        />
      ));
      
      return (
        <List>
          {inboxList}
        </List>
      )
    });
};

export default function Inbox(props) {
  const classes = useStyles();

  const [state, setState] = useState((
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{height: "100%"}}
    >
      <CircularProgress/>
    </Grid>
  ))

  useEffect(() => {
    getData(81).then(a => setState(a));
  }, []);

  return (
    <div className={classes.root}>

      {/* This is to make the sidebar actually take up space (otherwise content will hide behind it) */}
      <div style={{width: drawerWidth}}>
        <Sidebar
          permanent
          listItems={state}
          anchor="left"
          width={drawerWidth}
        />
      </div>
      <main className={classes.content}>
        <Container className="letter-container">
          <Typography variant="h4">hhaslam11</Typography>
          <Typography variant="subtitle2">Canada</Typography>
          <p className="letter-content">
            Nulla efficitur odio sed metus pellentesque tristique. Nunc est sem, suscipit vitae erat ac, malesuada euismod metus. Morbi scelerisque elementum arcu sit amet consectetur.
            Nulla efficitur odio sed metus pellentesque tristique. Nunc est sem, suscipit vitae erat ac, malesuada euismod metus. Morbi scelerisque elementum arcu sit amet consectetur.
            Nulla efficitur odio sed metus pellentesque tristique. Nunc est sem, suscipit vitae erat ac, malesuada euismod metus. Morbi scelerisque elementum arcu sit amet consectetur.
            Nulla efficitur odio sed metus pellentesque tristique. Nunc est sem, suscipit vitae erat ac, malesuada euismod metus. Morbi scelerisque elementum arcu sit amet consectetur.
          </p>
        </Container>
        <Divider />

        <Container className="reply-container" >
          <Typography variant="h4" className="reply-header">Reply</Typography>
          <TextareaAutosize placeholder="Write your letter..." />

          <div className="button-div">
            <Button
              variant="contained"
              size="small"
              endIcon={<SendIcon/>}
            >
              Send
            </Button>
          </div>

        </Container>
      </main>
    </div>
  )
}