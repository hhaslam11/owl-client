import React from 'react';
import { useState } from 'react';

import Login from './Login'
import { Button } from '@material-ui/core';

import "./Landing.scss"

export default function Landing(props) {
  const [state, setState] = useState({
    email: '',
    password: '',

    emailError: '',
    passwordError: '',
    generalError: '',

    open: false
  });
  
  const validate = (email, password) => {
    if (!email) {
      setState({...state, emailError: 'email cannot be blank'});
      return;
    }
    if (!password) {
      setState({...state, passwordError: 'password cannot be blank'});
      return;
    }
    if (email === 'owl@example.com' && password === 'coolowl') {
      setState({ ...state, email: null, password: null, open: false });
      props.login();
    } else {
      setState({...state, generalError: 'Email or password incorrect'});
    }
  };

  return (
    <>
      <img height="500px" alt="owl logo" src="/images/owltakingovertheworld.png"/>
      <br/>
      <Button variant="contained" size="large" color="primary" onClick={() => {setState({ ...state, open: true })}}>Login</Button>
      <Login
        open={state.open}
        generalError={state.generalError}

        emailValue={state.email}
        emailOnChange={(value) => setState({...state, email: value, emailError: null})}
        emailError={state.emailError}

        passwordValue={state.password}
        passwordOnChange={(value) => setState({...state, password: value, passwordError: null})}
        passwordError={state.passwordError}

        onCancel={() => setState({...state, open: false})}
        onSubmit={() => validate(state.email, state.password)}
      />
    </>
  )
}