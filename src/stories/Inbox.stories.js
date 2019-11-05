import React from 'react';
import { storiesOf } from '@storybook/react';

import InboxListItem from '../Inbox/InboxListItem';
import SidebarLoading from '../Inbox/SidebarLoading';
import SidebarEmpty from '../Inbox/SidebarEmpty';

storiesOf('Inbox', module)
  .add('Sidebar loading', () => <SidebarLoading />)
  .add('Sidebar Empty', () => <SidebarEmpty />)
  .add('Inbox List Item', () => <InboxListItem username="Brian" country="Canada"  flag="https://restcountries.eu/data/can.svg" />)
  .add('Inbox List Item Unread', () => <InboxListItem username="Brian" country="Canada" flag="https://restcountries.eu/data/can.svg" unread />)
  .add('Inbox List Item Selected', () => <InboxListItem username="Brian" country="Canada" flag="https://restcountries.eu/data/can.svg" selected />)