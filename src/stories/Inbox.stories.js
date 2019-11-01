import React from 'react';
import { storiesOf } from '@storybook/react';

import Inbox from '../Inbox/Inbox';
import InboxListItem from '../Inbox/InboxListItem';

storiesOf('Inbox', module)
  .add('Inbox', () => <Inbox />)
  .add('Inbox List Item', () => <InboxListItem username="Brian" country="Canada"  flag="https://restcountries.eu/data/can.svg" />)
  .add('Inbox List Item Unread', () => <InboxListItem username="Brian" country="Canada" flag="https://restcountries.eu/data/can.svg" unread />)
/*
because im lazy:
.add('', () => {})
.add('', () => <Inbox />)
*/