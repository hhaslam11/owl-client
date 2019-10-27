import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import "./Navigation.scss";

const useStyles = makeStyles(({
  root: {
    flexGrow: 1
  },
  navbar: {
    backgroundColor: props => props.backgroundColor
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white'
  }
}));

/**
 * @param {type} props.value description
 */
export default function Map(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Typography variant="h6" className={classes.title}>
            Owl
          </Typography>

          <IconButton edge="start" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}