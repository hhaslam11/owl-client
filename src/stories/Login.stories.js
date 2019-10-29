import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Login from '../Login'

storiesOf('Login', module)
  .add('Login', () => <Login/>)
  .add('with email error', () => <Login emailError='Email address not found' />)
  .add('with password error', () => <Login passwordError='Password is incorrect' />)
  .add('with general error', () => <Login generalError='Email or password is incorrect' />)
  .add('with filled values', () => <Login emailValue='CoolOwl@example.com' passwordValue='Hunter2' />)
  .add('with email and password change', () => {

    const [state, setState] = useState({
      passwordError: 'Password cannot be empty!',
      emailError: 'Email cannot be empty!'
    });

    return (
      <Login
        emailError={state.emailError}
        emailOnChange={() => {setState({...state, emailError: null})}}
        passwordError={state.passwordError}
        passwordOnChange={() => {setState({...state, passwordError: null})}}
      />
    )
  });

/*
because im lazy:
.add('', () => {})
.add('', () => <Login />)
*/