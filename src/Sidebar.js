import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import "./Sidebar.scss";

const useStyles = makeStyles(({
  root: {},
  paper: {
    backgroundColor: props => props.backgroundColor,
    color: props => props.color
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
    <Drawer classes={{ paper: classes.paper}} anchor="right" open={props.isOpen} onClose={props.onClose}>
      {props.listItems}
    </Drawer>
  );
};