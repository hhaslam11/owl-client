import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Material ui
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

// Snackbar
import { SnackbarProvider, useSnackbar } from 'notistack';

// Internal components
import Navigation from '../Navigation';
import Letter from './OpenedLetter'

// Sass
import "./PostOffice.scss";

//Gets server path from .env file
const API_SERVER = process.env.REACT_APP_API_SERVER;

const onLetterSelect = (cb, userID, countryID) => {
  
  axios.put(`${API_SERVER}/postoffice/${countryID}/new`, {
    receiver_id: userID
  })
    .then(res => {
      const result = {
        id: res.data.data.id,
        sender: res.data.data.sender.username,
        content: res.data.data.content,
        country: {
          name: res.data.data.sender.country.name,
          code: res.data.data.sender.country.abbreviation,
          flag: res.data.data.sender.country.flag_image
        },
        sent: res.data.data.sent_date
      };

      cb(result);
    })
    .catch(() => {
      cb();
    });
};

function PostOffice() {

  // Hooks 🦉
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const [letterOpen, setLetterOpen] = useState(false);
  const [letterData, setLetterData] = useState('');

  // Cookies
  const [cookies] = useCookies(['user']);

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Map</MenuItem>
      <MenuItem onClick={() => history.push('/inbox')}>Inbox</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
  
  return (
    <>
      <Navigation
        title="Owl Mail"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <Letter
        open={letterOpen}
        letterData={letterData}
        onClose={() => setLetterOpen(false)}
        onReply={() => {
          setLetterOpen(false);
          history.push('/inbox');
        }}
      />
      <div className="post-office-container">
        <img
          className="post-office-image"
          height="500px"
          alt="post office drawing"
          src="/images/mailbox.png"
          onClick={() => {
            onLetterSelect(res => {

              if (!res) {
                enqueueSnackbar('There are currently no letters at the post office')
              }

              setLetterData(res);
              setLetterOpen(true);
            }, cookies.id, cookies.country);
          }}
        />
      </div>
    </>
  )
}

export default function IntegrateSnackbar() {
  return (
    <SnackbarProvider>
      <PostOffice />
    </SnackbarProvider>
  )
}