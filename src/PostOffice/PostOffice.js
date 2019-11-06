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
const onLetterSelect = (cb) => {
  
  //set path for api here
  axios.put(`${API_SERVER}/path`, {
    //This is the object that get's sent in the put request.
    //Typical object structure. 
    // key: value
  })
    .then(res => {

      //Do whatever extra stuff you might want to do here,
      //then pass the response data (or some custom formatted data)
      //to the callback
      cb(res);

    })
    .catch(e => {

      // Maybe you want to make it display an error message on the front end
      // if request fails. You would do that here
      console.error('Error: ', e);

    });
};

export default function PostOffice() {

  // Hooks 🦉
  
  // This is just a weird way of redirecting with reactrouter.
  // history.push('url');
  const history = useHistory();
  
  // This sets whether or not the modal is visible
  // setModal(true) to open it
  // setModal(false) to close it
  const [modal, setModal] = useState(false);

  // Cookies
  // cookies.id will give you the current user id
  // cookies.country will give you the current users country (iso2 code)
  // setCookies('id', value); to set a cookie. If you don't need to set
  // cookies, just remove setCookie from the array
  const [cookies, setCookie] = useCookies(['user']);

  //This if for the navbar, you probably won't need to touch this
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
        title="Owl"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <Modal open={modal}>
        <div className="">
          Put your model html here. You can style it
          however you want. There should also be a button
          some sort of functionality that calls
          `setModal(false);` to close the modal
        </div>
      </Modal>
      <div className="post-office-container">
        The main html code would go here
        <Button onClick={() => setModal(true)}>Example of opening the modal</Button>
      </div>
    </>
  )
}