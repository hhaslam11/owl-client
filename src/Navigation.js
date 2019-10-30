import React from "react";
import { useState } from 'react';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import "./Navigation.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navbar: {
    backgroundColor: props => props.backgroundColor,
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1,
    color: props => props.color || 'white'
  },
  menuButton: {
    color: props => props.color || 'white'
  }
}));

/**
 * @param {string} props.title Main text displayed
 * @param {string} props.backgroundColor The background color
 * @param {string} props.color The text color
 */
export default function Map(props) {
  const classes = useStyles(props);

  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleMenuClick = event => {
    setAnchorEl(event.target);
    toggleMenu();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Typography variant="h6" className={classes.title}>
            {props.title || 'Home'}
          </Typography>

          <IconButton onClick={handleMenuClick} edge="start" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Popper open={menu} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ marginTop: '13px', transformOrigin: 'center bottom' }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={() => setMenu(false)}>
                <MenuList>
                  <MenuItem>Inbox</MenuItem>
                  <MenuItem>Post Office</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}