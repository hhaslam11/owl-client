import React from "react";
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: props => props.backgroundColor,
    color: props => props.color,
    zIndex: 2,
    width: props => props.width
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  toolbar: props => props.displayUnderNavigation && theme.mixins.toolbar
}));

/**
 * @param {boolean} props.isOpen is sidebar visible
 * @param {function} props.onClose callback function to run when close request is sent (usually you want it to change state)
 * @param {boolean} props.permanent is sidebar always visible?
 * @param {array} props.listItems the content of the sidebar (usually a <List>, see below for an example)
 * @param {string} props.color the text color (Icon colors need to be done in parent element)
 * @param {string} props.backgroundColor the background color
 * @param {string} props.anchor left || right - side of the screen to show on. Default right
 * @param {boolean} props.displayUnderNavigation true if you want it to show under the navbar instead of on top. Default false
 * @param {string} props.width width of the sidebar
 * 
 * An example of what props.listItems might look like.
 * More info at https://material-ui.com/components/lists/
 * ```
 * <List>
 *  <ListItem>
 *    <ListItemIcon><MailIcon /></ListItemIcon>
 *    <ListItemText primary={text} />
 *  </ListItem>
 *  <ListItem>
 *    <ListItemIcon><InboxIcon /></ListItemIcon>
 *    <ListItemText primary={text} />
 *  </ListItem>
 * <List>
 * ```
 */
export default function Sidebar(props) {
  const classes = useStyles(props);
  
  return (
    <Drawer 
      classes={{ paper: classes.paper }}
      anchor={props.anchor === 'left' ? 'left' : 'right'}
      open={props.isOpen}
      variant={props.permanent ? "permanent" : "persistent"}
    >
      <div className={classes.toolbar} />
      {!props.permanent && (
      <>
        <div className={classes.header}>
          <IconButton onClick={props.onClose}>
            {props.anchor === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon/>}
          </IconButton>
        </div>
        <Divider/>
      </>
      )}
      {props.listItems}
    </Drawer>
  );
};