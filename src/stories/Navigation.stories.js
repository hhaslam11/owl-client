import React from 'react';
import { storiesOf } from '@storybook/react';

import Navigation from '../Navigation'

storiesOf('Navbar', module)
  .add('Navbar skeleton', () => {
    return (<Navigation/>)
  });