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
import SidebarLoading from './SidebarLoading';
import Sent from './Sent';
import Sidebar from '../Sidebar';
import InboxListItem from '../Inbox/InboxListItem';
import Navigation from '../Navigation';

// Sass
import "./Inbox.scss"
import SidebarEmpty from './SidebarEmpty';
import sendLetter from '../helpers/sendLetter';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const drawerWidth = '300px';

// Override logged in userid. Only use this for development purposes, otherwise set to null
// 93 is a good example
// 300 is a blank example
const devUserId = null;

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
      const users = res.data.data;

      const data = {};

      for (const user of users) {
        data[user.letters[user.letters.length - 1].letter_id] = {
          letterId: user.letters[user.letters.length - 1].letter_id,
          username: user.username,
          country: user.country.name,
          countryId: user.country.abbreviation,
          flag: user.country.flag_image,
          unread: !user.letters[user.letters.length - 1].read,
          content: user.letters[user.letters.length - 1].content,
          letters: user.letters
        }
      }

      return data;
    });
};

export default function Inbox() {
  const classes = useStyles();
  const history = useHistory();
  
  //state
  const [selected, setSelected] = useState(null);
  const [textArea, setTextArea] = useState('');
  const [sent, setSent] = useState(false);

  const sidebarData = useRef(null);
  const [cookies] = useCookies(['user']);

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Map</MenuItem>
      <MenuItem>Post Office</MenuItem>
      <MenuItem onClick={() => history.push('/owls')}>My Owls</MenuItem>
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

        for (const user in data) {
          if (data[user].letters[data[user].letters.length - 1].sender === (devUserId || Number(cookies.id))) {
            data[user].unread = false;
          }
        }

        sidebarData.current = (data);
        select(Object.keys(data)[0]);

      })
      .catch((e) => console.error(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let inboxList = <SidebarLoading/>;
  if (selected === 0) inboxList = <SidebarEmpty/>

  const send = () => {
    const toCountry = sidebarData.current[selected].countryId;
    const letterId  = sidebarData.current[selected].letterId;

    sendLetter(cookies.id, cookies.country, toCountry, textArea, letterId);
    setSent(true);
    setTextArea('');
  };

  for (const i in sidebarData.current) {
    if (!Array.isArray(inboxList)) inboxList = [];
    inboxList.push((
      <InboxListItem
        username={sidebarData.current[i].username ? sidebarData.current[i].username : "Not picked up"}
        country={sidebarData.current[i].country}
        flag={sidebarData.current[i].flag}
        unread={sidebarData.current[i].unread}
        onClick={() => select(i)}
        selected={selected === i}
      />
    ))
  }

  let contentList = [];
  if (selected) {
    for (const letter of sidebarData.current[selected].letters) {
      contentList.push((
        <>
          <Container className="letter-container">
            <Typography variant="h4">{letter.sent_by_current_user ? "You" : sidebarData.current[selected].username}</Typography>
            <Typography variant="subtitle2">{letter.sent_date.slice(0,10)}</Typography>
            <p className="letter-content">
              {letter.content}
            </p>
          </Container>
          <Divider />
        </>
      ));
    }
  } else {
    contentList = null;
  }

  return (
    <>
    <Sent
      open={sent}
      country={selected && sidebarData.current[selected].country}
      onClose={() => {
        setSelected(null);
        history.push('/');
      }}
    />
    <Navigation
        title="Owl Mail"
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
        {contentList}
        <Container className="reply-container" >
          <Typography variant="h4" className="reply-header">Reply</Typography>
          <TextareaAutosize
            placeholder="Write your letter..."
            disabled={!selected}
            value={textArea}
            onChange={e => setTextArea(e.target.value)}
          />

          <div className="button-div">
            <Button
              variant="contained"
              size="small"
              endIcon={<SendIcon/>}
              disabled={!selected}
              onClick={send}
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