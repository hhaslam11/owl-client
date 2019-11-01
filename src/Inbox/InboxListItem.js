import React from "react";

// Material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from "@material-ui/core/Divider"
import Badge from '@material-ui/core/Badge';

import './InboxListItem.scss';

/**
 * @param {boolean} props.unread true will display the unread badge
 * @param {string} props.username Username of the user who sent the letter
 * @param {string} props.country Full name of country origin
 * @param {string} props.flag url of the country flag
 */
export default function Inbox(props) {
  
  if (!props.username || !props.country || !props.flag) {
    console.error('Some of the props seem to be missing.');
    return null;
  }

  return (
    <>
    <ListItem button>
      <ListItemAvatar>
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