import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import "./Sidebar.scss";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(({
  root: {},
  paper: {
    backgroundColor: props => props.backgroundColor,
    color: props => props.color,
    // zIndex: 0,
    marginTop: "100p"
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}));

/**
 * @param {boolean} props.isOpen is sidebar visible
 * @param {function} props.onClose callback function to run when close request is sent (usually you want it to change state)
 * @param {array} props.listItems
 * @param {string} props.color the text color (Icon colors need to be done in parent element)
 * @param {string} props.backgroundColor the background color
 */
export default function Sidebar(props) {
  const classes = useStyles(props);
  
  return (
    <Drawer 
      classes={{ paper: classes.paper }}
      anchor="right"
      open={props.isOpen}
      variant="persistent"
    >
      <div className={classes.header}>
        <IconButton onClick={props.onClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider/>
      {props.listItems}
    </Drawer>
  );
};