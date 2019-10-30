import React from 'react';
// import { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Register from '../Register'
// import { Button } from '@material-ui/core';

storiesOf('Register', module)
  .add('Register', () => <Register open={true}/>);
/*
because im lazy:
.add('', () => {})
.add('', () => <Register />)
*/