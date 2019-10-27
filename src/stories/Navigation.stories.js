import React from 'react';
import { storiesOf } from '@storybook/react';

import Navigation from '../Navigation'

storiesOf('Navbar', module)
  .add('Navbar skeleton', () => {
    return (<Navigation/>)
  })
  .add('navbar with custom background color', () => {
    return (<Navigation backgroundColor='pink' />)
  });

/*
because im lazy:
.add('', () => {})
*/