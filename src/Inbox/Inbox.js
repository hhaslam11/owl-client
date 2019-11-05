import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";

// Material ui
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize, Button } from "@material-ui/core";

// Internal components
import Sidebar from '../Sidebar';
import SidebarLoading from './SidebarLoading';
import InboxListItem from '../Inbox/InboxListItem';
import Navigation from '../Navigation';

// Sass
import "./Inbox.scss"
import SidebarEmpty from './SidebarEmpty';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const drawerWidth = '300px';

// Override logged in userid. Only use this for development purposes, otherwise set to null
// 93 is a good example
// 300 is a blank example
const devUserId = 93;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '70px'
  }
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

export default function Inbox() {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const sidebarData = useRef(null);
  const [cookies] = useCookies(['user']);

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Map</MenuItem>
      <MenuItem>Post Office</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
  
  /**
   * Select a letter, marking it as read if not already (on front-end and api)
   * @param {number} id letter id to select
   */
  const select = id => {

    // if id is falsy, that means theres no recieved/sent letters.
    // Im setting selected to 0 because i need it to be fasly
    // while being able to differentiate it from null
    if (!id) {
      setSelected(0);
      return;
    } 

    if (sidebarData.current[id].unread) {

      // For now, im just assuming the request works fine.
      // It would be nice to have error checking- not a priority at the
      // moment, though. <3
      axios.put(`${API_SERVER}/users/${devUserId || cookies.id}/letters/${id}`, { read: true })
        .catch(e => console.error(e));

      sidebarData.current[id].unread = false;
    }

    setSelected(id);
  }

  useEffect(() => {
    
    // This is going to get the data from the api server
    // on first render, and save it in sidebarData
    getData(devUserId || cookies.id)
      .then(data => {

        sidebarData.current = (data);
        select(Object.keys(data)[0]);

      })
      .catch((e) => console.error(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let inboxList = <SidebarLoading/>;
  if (selected === 0) inboxList = <SidebarEmpty/>

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
    <>
    <Navigation
        title="Owl"
        menuList={navMenu}
        backgroundColor="#012b54"
    />
    <div className="inbox">

      {/* This is to make the sidebar actually take up space (otherwise content will hide behind it) */}
      <div style={{width: drawerWidth}}>
        <Sidebar
          permanent
          displayUnderNavigation
          listItems={inboxList}
          anchor="left"
          width={drawerWidth}
        />
      </div>
      <main className={classes.content}>
        <Container className="letter-container">
          <Typography variant="h4">{selected ? sidebarData.current[selected].username : null}</Typography>
          <Typography variant="subtitle2">{selected ? sidebarData.current[selected].country : null}</Typography>
          <p className="letter-content">
            {selected ? sidebarData.current[selected].content : null}
          </p>
        </Container>
        <Divider />

        <Container className="reply-container" >
          <Typography variant="h4" className="reply-header">Reply</Typography>
          <TextareaAutosize
            placeholder="Write your letter..."
            disabled={!selected}
          />

          <div className="button-div">
            <Button
              variant="contained"
              size="small"
              endIcon={<SendIcon/>}
              disabled={!selected}
            >
              Send
            </Button>
          </div>

        </Container>
      </main>
    </div>
    </>
  )
}