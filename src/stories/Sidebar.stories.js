import React from 'react';
import { storiesOf } from '@storybook/react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Sidebar from '../Sidebar'

const sideList = (
  <div
    role="presentation"
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

storiesOf('Sidebar', module)
  .add('Sidebar closed', () => <Sidebar listItems={sideList}/>)
  .add('Sidebar opened', () => <Sidebar listItems={sideList} isOpen={true} />);
  // .add('Sidebar toggle', () => {

  //   return <Sidebar listItems={sideList} />
  // });

/*
because im lazy:
.add('', () => {})
.add('', () => <Sidebar />)
*/