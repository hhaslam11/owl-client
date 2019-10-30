import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@material-ui/core';

import Register from '../Register'

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
  .add('Full demo', () => {})
  ;
/*
because im lazy:
.add('', () => {})
.add('', () => <Register open />)
*/