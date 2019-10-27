import React from 'react';
import { storiesOf } from '@storybook/react';

import Sidebar from '../Sidebar'

storiesOf('Sidebar', module)
  .add('Sidebar', () => <Sidebar />);

/*
because im lazy:
.add('', () => {})
.add('', () => <Navigation />)
*/