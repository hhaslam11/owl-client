import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@material-ui/core';

import Register from '../Register'
import { statement } from '@babel/template';

storiesOf('Register', module)
  .add('Register', () => <Register open />)
  .add('with custom title', () => <Register open title='🦉 Create a new account 🦉'/>)
  .add('With filled values', () => {
    return (
      <Register
        open
        emailValue='owl@example.com'
        usernameValue='CoolOwl99'
        passwordValue='Hunter2'
      />
    )
  })
  .add('With error', () => <Register open error='Something went wrong' />)
  .add('With view toggle', () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => {setOpen(true)}}>Open modal</Button>
        <Register
          open={open}
          onCancel={() => setOpen(false)}
        />
      </>
    )
  })
  .add('Full demo', () => {
    const [state, setState] = useState({
      open: false,
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      error: ''
    });

    const validate = () => {
      if (state.password !== state.passwordConfirm) {
        setState({ ...state, error: 'Passwords do not match.' });
        return;
      }
      if (!state.email) {
        setState({ ...state, error: 'Email cannot be blank' });
        return;
      }
      if (!state.username) {
        setState({ ...state, error: 'Username cannot be blank' });
        return;
      }
      if (!state.password) {
        setState({ ...state, error: 'Password cannot be blank' });
        return;
      }
      setState({ ...statement, open: false, email: 'Successfully registered' });
    };

    const cancel = () => {
      setState({ ...state, passwordConfirm: '', open: false });
    };

    return (
      <>
        <p>Email: {state.email}</p>
        <p>Username: {state.username}</p>
        <p>Password: {state.password}</p>
        <p>Password confirm: {state.passwordConfirm}</p>
        <Button onClick={() => setState({ ...state, open: true })}>Register</Button>
        <Register 
          title="Create an account 🦉"
          open={state.open}

          emailValue={state.email}
          emailOnChange={(value) => setState({ ...state, email: value, error: '' })}

          usernameValue={state.username}
          usernameOnChange={(value) => setState({ ...state, username: value, error: '' })}

          passwordValue={state.password}
          passwordOnChange={(value) => setState({ ...state, password: value, error: '' })}
          passwordConfirmOnChange={(value) => setState({ ...state, passwordConfirm: value, error: '' })}

          onSubmit={validate}
          onCancel={cancel}

          error={state.error}
        />
      </>
    )
  })
  ;
/*
because im lazy:
.add('', () => {})
.add('', () => <Register open />)
*/