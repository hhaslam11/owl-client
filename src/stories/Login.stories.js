import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Login from '../Login'
import { Button } from '@material-ui/core';

storiesOf('Login', module)
  .add('Login', () => <Login open={true}/>)
  .add('with email error', () => <Login open={true} emailError='Email address not found' />)
  .add('with password error', () => <Login open={true} passwordError='Password is incorrect' />)
  .add('with general error', () => <Login open={true} generalError='Email or password is incorrect' />)
  .add('with filled values', () => <Login open={true} emailValue='CoolOwl@example.com' passwordValue='Hunter2' />)
  .add('with email and password change', () => {
    const [state, setState] = useState({
      passwordError: 'Password cannot be empty!',
      emailError: 'Email cannot be empty!'
    });

    return (
      <Login
        open={true}
        emailError={state.emailError}
        emailOnChange={() => {setState({...state, emailError: null})}}
        passwordError={state.passwordError}
        passwordOnChange={() => {setState({...state, passwordError: null})}}
      />
    )
  })
  .add('with open and close', () => {
    const [state, setState] = useState({
      open: false
    });

    return (
      <>
      <Button onClick={() => {setState({ ...state, open: true })}}>Login</Button>
      <Login
        open={state.open}
        onCancel={() => setState({...state, open: false})}
      />
      </>
    )
  })
  .add('full demo', () => {
    const [state, setState] = useState({
      email: '',
      password: '',

      emailError: '',
      passwordError: '',

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
      setState({ ...state, email: null, password: null, open: false });
    };

    return (
      <>
      <Button onClick={() => {setState({ ...state, open: true })}}>Login</Button>
      <Login
        open={state.open}

        emailValue={state.email}
        emailOnChange={(value) => setState({...state, email: value, emailError: null})}
        emailError={state.emailError}

        passwordValue={state.password}
        passwordOnChange={(value) => setState({...state, password: value, passwordError: null})}
        passwordError={state.passwordError}

        onCancel={() => setState({...state, open: false})}
        onSubmit={() => validate(state.email, state.password)}
      />
      <p>email: {state.email}</p>
      <p>password: {state.password}</p>
      </>
    )
  });

/*
because im lazy:
.add('', () => {})
.add('', () => <Login />)
*/