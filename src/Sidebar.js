import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import "./Sidebar.scss";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    backgroundColor: props => props.backgroundColor,
    color: props => props.color,
    zIndex: 0
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  toolbar: theme.mixins.toolbar
}));

/**
 * @param {boolean} props.isOpen is sidebar visible
 * @param {function} props.onClose callback function to run when close request is sent (usually you want it to change state)
 * @param {array} props.listItems
 * @param {string} props.color the text color (Icon colors need to be done in parent element)
 * @param {string} props.backgroundColor the background color
 * @param {string} props.anchor left || right - side of the screen to show on. Default right
 */
export default function Sidebar(props) {
  const classes = useStyles(props);
  
  return (
    <Drawer 
      classes={{ paper: classes.paper }}
      anchor={props.anchor === 'left' ? 'left' : 'right'}
      open={props.isOpen}
      variant="persistent"
    >
      <div className={classes.toolbar} />
      <div className={classes.footer}>
        <IconButton onClick={props.onClose}>
          {props.anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon/>}
        </IconButton>
      </div>
      <Divider/>
      {props.listItems}
    </Drawer>
  );
};