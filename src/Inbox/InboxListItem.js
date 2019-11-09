import React from "react";

// Material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from "@material-ui/core/Divider";
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core';

import './InboxListItem.scss';

const useStyles = makeStyles(({
  listSelected: {
    backgroundColor: '#589828',
    color: "white",
  }
}));

/**
 * @param {boolean} props.unread True will display the unread badge
 * @param {string} props.username Username of the user who sent the letter
 * @param {string} props.country Full name of country origin
 * @param {string} props.flag Url of the country flag
 * @param {function} props.onClick Callback function for onclick
 * @param {boolean} props.selected True if its the currently selected letter
 */
export default function Inbox(props) {
  const classes = useStyles();
  if (!props.username || !props.country || !props.flag) {
    console.error('Some of the props seem to be missing.');
    return null;
  }

  return (
    <>
      <ListItem
        button={!props.selected}
        className={props.selected && classes.listSelected}
        onClick={props.onClick}
      >
        <ListItemAvatar style={{ minWidth: "90px" } /* TODO maybe don't hardcode this */}>
          <img className="flag" alt={`${props.country} flag`} src={props.flag} />
        </ListItemAvatar>

        {props.unread ? (
          <Badge color="secondary" variant="dot">
            <ListItemText primary={props.username} secondary={props.country} />
          </Badge>
        ) : (
          <ListItemText primary={props.username} secondary={props.country} />
        )}

      </ListItem>
      <Divider />
    </>
  )
}