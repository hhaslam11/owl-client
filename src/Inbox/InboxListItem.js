import React from "react";
import { useState } from 'react';

// Material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Badge from '@material-ui/core/Badge';

import './InboxListItem.scss';

/**
 * @param {boolean} props.unread true will display the unread badge
 * @param {boolean} props.unread true will display the unread badge
 */
export default function Inbox(props) {
  
  const listItemContent = (
    <>
      <ListItemAvatar>
        <img className="flag" alt="Burundi Flag" src="https://restcountries.eu/data/bdi.svg" />
      </ListItemAvatar>
      <ListItemText primary="CoolOwl" secondary="Burundi" />
    </>
  );

  return (
    <ListItem button>
      {!props.unread && listItemContent}
      {props.unread && (
        <Badge color="secondary" variant="dot">
          {listItemContent}
        </Badge>
      )}
    </ListItem>
  )
}