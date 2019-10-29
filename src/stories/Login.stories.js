import React from 'react';
import { storiesOf } from '@storybook/react';

import Login from '../Login'

storiesOf('Login', module)
  .add('Login', () => <Login/>)
  .add('with email error', () => <Login emailError='Email address not found' />)
  .add('with password error', () => <Login passwordError='Password is incorrect' />)
  .add('with general error', () => <Login generalError='Email or password is incorrect' />);

/*
because im lazy:
.add('', () => {})
.add('', () => <Login />)
*/