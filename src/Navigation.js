import React from "react";
import { useState } from 'react';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: props => props.backgroundColor,
    zIndex: theme.zIndex.drawer + 1,
    height: "50px"
  },
  navRight: {
    display: "flex",
    justifyContent: "left"
  },
  title: {
    flexGrow: 1,
    color: props => props.color || 'white',
    fontFamily: "'Fredoka One', cursive",
    fontSize: "35px"
  },
  menuButton: {
    color: props => props.color || 'white'
  }
}));

/**
 * @param {string} props.title Main text displayed
 * @param {string} props.backgroundColor The background color
 * @param {string} props.color The text color
 * @param {JSX} props.menuList a MenuList for when the hamburger menu is clicked (see example below)
 * 
 * ```
 * <MenuList>
 *   <MenuItem>Inbox</MenuItem>
 *   <MenuItem>My Account</MenuItem>
 *   <MenuItem>Logout</MenuItem>
 * </MenuList>
 * ```
 */
export default function Map(props) {
  const classes = useStyles(props);

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  
  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleMenuClick = () => {
    if (props.menuList) {
      toggleMenu();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.navbar}>
          <div className={classes.navRight}>
            <img class="nav" height="50px" alt="owl logo" src="/images/owl-closed-branch-artboard-01.png"/>
            <Typography variant="h6" className={classes.title}>
              {props.title || 'Home'}
            </Typography>
          </div>

          <IconButton ref={anchorRef} onClick={handleMenuClick} edge="start" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Popper style={{ zIndex: 3 }} open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            { ...TransitionProps }
            style={{ marginTop: '10px', transformOrigin: 'center top' }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                {props.menuList}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}