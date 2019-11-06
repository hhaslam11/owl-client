import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Material ui
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { Modal, Button } from '@material-ui/core';

// Internal components
import Navigation from '../Navigation';
import Letter from './Letter'
// Sass
import "./PostOffice.scss";

//Gets server path from .env file
const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
 * Makes a put request to the API server.
 * You likely want to pass this a callback function, and run that callback function
 * with the response data. (depending on how you do things though)
 * 
 * You might also need to pass it other data (userID, letterID, etc), since
 * this function is outside of the main component, it doesnt have access to
 * cookies, props, state, etc.
 */
const onLetterSelect = (cb, userID, countryID) => {
  
  //set path for api here
  axios.put(`${API_SERVER}/postoffice/245/new`, {
    country_code: countryID,
    receiver_id: userID
  })
    .then(res => {
      const result = {
        id: res.data.id,
        sender: res.data.sender.username,
        content: res.data.content,
        country: {
          name: res.data.sender.country.name,
          code: res.data.sender.country.abbreviation,
          flag: res.data.sender.country.flag_image
        },
        sent: res.data.sent_date
      };
      


      //Do whatever extra stuff you might want to do here,
      //then pass the response data (or some custom formatted data)
      //to the callback
      cb(result);

    })
    .catch(e => {

      // Maybe you want to make it display an error message on the front end
      // if request fails. You would do that here
      console.error('Error: ', e);

    });
};

export default function PostOffice() {

  // Hooks 🦉
  const history = useHistory();

  const [letterOpen, setLetterOpen] = useState(false);
  const [letterData, setLetterData] = useState('');

  // Cookies
  // cookies.id will give you the current user id
  // cookies.country will give you the current users country (iso2 code)
  // setCookies('id', value); to set a cookie. If you don't need to set
  // cookies, just remove setCookie from the array
  const [cookies] = useCookies(['user']);

  //This if for the navbar, you probably won't need to touch this
  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Map</MenuItem>
      <MenuItem onClick={() => history.push('/inbox')}>Inbox</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )

 ;
  
  return (
    <>
      <Navigation
        title="Owl Mail"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <Letter
        open={letterOpen}
        onOpen
        letterData={letterData}
        onClose={() => setLetterOpen(false)}
        onReply={() => {
          setLetterOpen(false);
          // replyLetter(letterID);
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
              setLetterData(res);
              setLetterOpen(true);
            }, cookies.id, cookies.country);
          }}
        />
      </div>
    </>
  )
}