import React from 'react';

import { ListItem, ListItemText } from "@material-ui/core";

export default function SidebarEmpty() {
  return (
    <ListItem>
      <ListItemText
        primary="You havent recieved any letter's yet!"
        secondary="Check out the post office to see if any letters are available"
      />
    </ListItem>
  )
}
