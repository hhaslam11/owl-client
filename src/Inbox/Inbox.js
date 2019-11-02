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

const API_SERVER = '//localhost:3000';
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

      const data = {};
      for (const el of received_letters) {
        data[el.id] = {
          username: el.sender.username,
          country: el.sender.country.name,
          flag: el.sender.country.flag_image,
          unread: !el.read,
          content: el.content
        }
      }

      return data;
    });
};

export default function Inbox(props) {
  const classes = useStyles();

  const [sidebar, setSidebar] = useState((
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{height: "100%"}}
    >
      <CircularProgress/>
    </Grid>
  ));
  
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getData(81)
      .then(data => {
        const inboxList = [];
        for(const i in data) {
          inboxList.push((
            <InboxListItem 
              username={data[i].username}
              country={data[i].country}
              flag={data[i].flag}
              unread={!data[i].unread}
            />
          ))
        }
        
        setSidebar(inboxList);
        // setLetter(data[].content);
      })
      .catch(() => setSidebar(<p>Can't connect to server</p>));
  }, []);

  return (
    <div className={classes.root}>

      {/* This is to make the sidebar actually take up space (otherwise content will hide behind it) */}
      <div style={{width: drawerWidth}}>
        <Sidebar
          permanent
          listItems={sidebar}
          anchor="left"
          width={drawerWidth}
        />
      </div>
      <main className={classes.content}>
        <Container className="letter-container">
          <Typography variant="h4">hhaslam11</Typography>
          <Typography variant="subtitle2">Canada</Typography>
          <p className="letter-content">
            {}
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