import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Login from './Login'
import Register from './Register'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import "./Landing.scss";

const GENERIC_ERROR = "Something went wrong. Please try again";
const API_SERVER    = process.env.REACT_APP_API_SERVER;

const useStyles = makeStyles(({
  landingBtn: {
    margin: "5px",
    backgroundColor: "#84CA50",
    fontFamily: "'Fredoka One', cursive",
  }
}));

export default function Landing(props) {
  const classes = useStyles();
  const [login, setLogin] = useState({
    email: '',
    password: '',

    emailError: '',
    passwordError: '',
    generalError: '',

    open: false
  });

  const [register, setRegister] = useState({
    open: false,
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    error: ''
  });
  
  const validate = (email, password) => {
    if (!email) {
      setLogin({...login, emailError: 'email cannot be blank'});
      return;
    }
    if (!password) {
      setLogin({...login, passwordError: 'password cannot be blank'});
      return;
    }
      
    axios.post(`${API_SERVER}/login`, {
      email: login.email,
      password: login.password
    })
    .then(r => {

      if (r.data.status !== 'ERROR') {
        props.login(r.data.data.id);
        setLogin({ ...login, email: null, password: null, open: false });
      } else {
        setLogin({ ...login, generalError: 'Email or password incorrect' });
      }
    })
    .catch(e => {
      console.error(e);
      setLogin({...login, generalError: GENERIC_ERROR});
    });
    
  };

  const validateRegister = () => {
    
    //Local verification before bothering API
    if (register.password !== register.passwordConfirm) {
      setRegister({ ...register, error: 'Passwords do not match.' });
      return;
    }
    if (!register.email) {
      setRegister({ ...register, error: 'Email cannot be blank' });
      return;
    }
    if (!register.username) {
      setRegister({ ...register, error: 'Username cannot be blank' });
      return;
    }
    if (!register.password) {
      setRegister({ ...register, error: 'Password cannot be blank' });
      return;
    }
    
    axios.post(`${API_SERVER}/users`, {
      email: register.email,
      username: register.username,
      password: register.password,
      password_confirmation: register.passwordConfirm
    })
    .then(r => {
      if (r.data.status === "ERROR") {
        let error;
        if (r.data.data.email)    error = `Email ${r.data.data.email}`;
        if (r.data.data.username) error = `Username ${r.data.data.username}`;
        if (r.data.data.password) error = `Password ${r.data.data.password}`;
        
        //fallback if for some reason no error was set
        if (!error) {
          error = GENERIC_ERROR;
        }

        setRegister({ ...register, error });
      } else {
        props.login(r.data.data.id);
      }
    })
    .catch(e => {
      console.error(e);
      setRegister({ ...register, error: GENERIC_ERROR });
    });
  };

  return (
    <>
      <container class="landing-page">
        <div class="top-logo">
          <span class="landing-span">Owl Mail</span>
        </div>
        <img class="landing" height="500px" alt="owl logo" src="/images/owltakingovertheworld.png"/>
        <br/>
        <div class="buttons">
          <Button className={classes.landingBtn} variant="contained" size="large" color="primary" onClick={() => {setLogin({ ...login, open: true })}}>Login</Button>
          <Button className={classes.landingBtn} variant="contained" size="large" color="primary" onClick={() => {setRegister({ ...login, open: true })}}>Register</Button>
        </div>
        <Login
          open={login.open}
          generalError={login.generalError}

          emailValue={login.email}
          emailOnChange={(value) => setLogin({...login, email: value, emailError: null})}
          emailError={login.emailError}

          passwordValue={login.password}
          passwordOnChange={(value) => setLogin({...login, password: value, passwordError: null})}
          passwordError={login.passwordError}

          onCancel={() => setLogin({...login, open: false})}
          onSubmit={() => validate(login.email, login.password)}
        />
        <Register
          title="Create an account 🦉"
          open={register.open}

          emailValue={register.email}
          emailOnChange={(value) => setRegister({ ...register, email: value, error: '' })}

          usernameValue={register.username}
          usernameOnChange={(value) => setRegister({ ...register, username: value, error: '' })}

          passwordValue={register.password}
          passwordOnChange={(value) => setRegister({ ...register, password: value, error: '' })}
          passwordConfirmOnChange={(value) => setRegister({ ...register, passwordConfirm: value, error: '' })}

          onSubmit={validateRegister}
          onCancel={() => {
            setRegister({ ...register, passwordConfirm: '', open: false })
          }}

          error={register.error}
        />
      </container>
    </>
  );
}