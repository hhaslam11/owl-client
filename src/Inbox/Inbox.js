import React from 'react';
import { useState, useEffect, useRef } from 'react';

// Material ui
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from '../Sidebar';
import SidebarLoading from './SidebarLoading'
import InboxListItem from '../Inbox/InboxListItem';
import { TextareaAutosize, Button } from "@material-ui/core";

import "./Inbox.scss"
import axios from "axios";

const API_SERVER = '//localhost:3000';
const drawerWidth = '300px';

//Just for testing purposes. Should be taken from cookies
const userId = 90;

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

  const [selected, setSelected] = useState(null);
  const sidebarData = useRef(null);

  /**
   * Select a letter, marking it as read if not already (on front-end and api)
   * @param {number} id letter id to select
   */
  const select = id => {

    if (sidebarData.current[id].unread) {

      // For now, im just assuming the request works fine.
      // It would be nice to have error checking- not a priority at the
      // moment, though. <3
      axios.put(`${API_SERVER}/users/${userId}/letters/${id}`, { read: true })
        .catch(e => console.error(e));

      sidebarData.current[id].unread = false;
    }

    setSelected(id);
  }

  useEffect(() => {
    // This is going to get the data from the api server
    // on first render, and save it in sidebarData
    getData(userId)
      .then(data => {

        sidebarData.current = (data);
        select(Object.keys(data)[0])

      })
      .catch((e) => console.error(e));
  }, []);

  let inboxList = <SidebarLoading/>;

  /*
   * Re-creates the sidebar data every render
   * This isnt the best way of doing thing, but
   * it works for now. useRef would probably be 
   * better here
   */
  for (const i in sidebarData.current) {
    if (!Array.isArray(inboxList)) inboxList = [];
    inboxList.push((
      <InboxListItem
        username={sidebarData.current[i].username}
        country={sidebarData.current[i].country}
        flag={sidebarData.current[i].flag}
        unread={sidebarData.current[i].unread}
        onClick={() => select(i)}
        selected={selected === i}
      />
    ))
  }

  return (
    <div className={classes.root}>

      {/* This is to make the sidebar actually take up space (otherwise content will hide behind it) */}
      <div style={{width: drawerWidth}}>
        <Sidebar
          permanent
          listItems={inboxList}
          anchor="left"
          width={drawerWidth}
        />
      </div>
      <main className={classes.content}>
        <Container className="letter-container">
          <Typography variant="h4">{selected && sidebarData.current[selected].username}</Typography>
          <Typography variant="subtitle2">{selected && sidebarData.current[selected].country}</Typography>
          <p className="letter-content">
            {selected && sidebarData.current[selected].content}
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