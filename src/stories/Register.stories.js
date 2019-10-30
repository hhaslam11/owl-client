import React from 'react';
// import { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Register from '../Register'
// import { Button } from '@material-ui/core';

storiesOf('Register', module)
  .add('Register', () => <Register open />)
  .add('with custom title', () => <Register open title='Register for cool owls!'/>);
/*
because im lazy:
.add('', () => {})
.add('', () => <Register />)
*/