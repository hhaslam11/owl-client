import React from 'react';
import { storiesOf } from '@storybook/react';

// Material UI
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import Navigation from '../Navigation'

const menuList = (
  <MenuList>
    <MenuItem>Inbox</MenuItem>
    <MenuItem>My Account</MenuItem>
    <MenuItem>Logout</MenuItem>
  </MenuList>
)

storiesOf('Navigation', module)
  .add('Navigation', () => <Navigation/>)
  .add('with custom background color', () => <Navigation backgroundColor='pink' />)
  .add('with custom title', () => <Navigation title="Pretty Cool App" />)
  .add('with custom text color', () => <Navigation color="yellow" />)
  .add('with menu items', () => <Navigation menuList={menuList} />);

/*
because im lazy:
.add('', () => {})
.add('', () => <Navigation />)
*/