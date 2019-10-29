import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Sidebar from '../Sidebar'
import Navigation from '../Navigation'

//This is example data for what would go into the sidebar
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
  .add('Sidebar opened', () => <Sidebar listItems={sideList} isOpen={true} />)
  .add('Sidebar toggle', () => {
    //using state to toggle the sidebar
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open sidebar</Button>
        <Sidebar listItems={sideList} isOpen={open} onClose={() => setOpen(false)}/>
      </>
    )
  })
  .add('with custom colors', () => <Sidebar isOpen={true} listItems={sideList} color={'yellow'} backgroundColor={'purple'} />)
  .add('anchored on left side', () => <Sidebar isOpen={true} listItems={sideList} anchor='left' />)
  .add('with navbar', () => {
    return (
      <>
        <Navigation />
        <Sidebar isOpen={true} listItems={sideList} displayUnderNavigation={true} />
      </>
    )
  });

/*
because im lazy:
.add('', () => {})
.add('', () => <Sidebar />)
*/