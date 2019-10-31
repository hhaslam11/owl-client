import React from 'react';
import { storiesOf } from '@storybook/react';

import Inbox from '../Inbox/Inbox'

storiesOf('Inbox', module)
  .add('Inbox', () => <Inbox />);

/*
because im lazy:
.add('', () => {})
.add('', () => <Inbox />)
*/