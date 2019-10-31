import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Login from './Login'
import Register from './Register'
import { Button } from '@material-ui/core';

import "./Landing.scss";

const GENERIC_ERROR = "Something went wrong. Please try again";

export default function Landing(props) {
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
    if (email === 'owl@example.com' && password === 'coolowl') {
      setLogin({ ...login, email: null, password: null, open: false });
      props.login();
    } else {
      setLogin({...login, generalError: 'Email or password incorrect'});
    }
  };

  const validateRegister = () => {
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
    
    axios.post('httpa://192.168.88.214:3000/users', {
      email: register.email,
      username: register.username,
      password: register.password,
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
        props.login();
      }
    })
    .catch(e => {
      console.error(e);
      setRegister({ ...register, error: GENERIC_ERROR });
    });
  };

  return (
    <>
      <img height="500px" alt="owl logo" src="/images/owltakingovertheworld.png"/>
      <br/>
      <Button variant="contained" size="large" color="primary" onClick={() => {setLogin({ ...login, open: true })}}>Login</Button>
      <Button variant="contained" size="large" color="primary" onClick={() => {setRegister({ ...login, open: true })}}>Register</Button>
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
          onCancel={() => {setRegister({ ...register, passwordConfirm: '', open: false })}}

          error={register.error}
        />
    </>
  )
}