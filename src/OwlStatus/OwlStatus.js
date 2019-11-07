import React from "react";
import { useHistory } from 'react-router-dom';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

//internal components
import OwlStatusListItem from "./OwlStatusListItem";
import Navigation from '../Navigation';

export default function OwlStatus() {
  const history = useHistory();

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/')}>Map</MenuItem>
      <MenuItem onClick={() => history.push('/inbox')}>Inbox</MenuItem>
      <MenuItem onClick={() => history.push('/owls')}>My Owls</MenuItem>
      <MenuItem onClick={() => history.push('/postoffice')}>Post Office</MenuItem>
      <MenuItem>Logout</MenuItem>
    </MenuList>
  )
  
  return (
    <>
      <Navigation
        title="Owl Mail"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <OwlStatusListItem />
    </>
  )
}