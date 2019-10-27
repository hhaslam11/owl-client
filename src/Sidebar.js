import React from "react";

import Drawer from '@material-ui/core/Drawer';

import "./Sidebar.scss";

/**
 * @param {boolean} props.open is sidebar visible
 */
export default function Sidebar(props) {
  return (
    <Drawer anchor="right" open={props.isOpen}>
      {props.listItems}
    </Drawer>);
}