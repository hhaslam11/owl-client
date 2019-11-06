import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// import './Dashboard.scss';

//Material UI components
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import PublicIcon from '@material-ui/icons/Public';

import Navigation from './Navigation';
import Sidebar from './Sidebar';
import Map from './Map';
import Letter from './Letter'
import useLocation from './hooks/useLocation';
import sendLetter from './helpers/sendLetter';

/**
 * @param {function} props.logout the function to call when user clicks logout
 */
export default function Dashboard(props) {
  
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['user']);
  const getLocation = useLocation;

  useEffect(() => {
    getLocation(iso2 => {
      setCookie('country', iso2);
      setState({ ...state, userCountryId: iso2});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    open: false,
    selected: null,
    countryName: null,
    userCountryId: null
  });

  const [letterOpen, setLetterOpen] = useState(false);

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/inbox')}>Inbox</MenuItem>
      <MenuItem onClick={() => history.push('/postoffice')}>Post Office</MenuItem>
      <MenuItem onClick={props.logout}>Logout</MenuItem>
    </MenuList>
  )

  const onCountryClick = event => {
    setState({
      ...state,
      selected: event.target.dataItem.dataContext.id,
      countryName: event.target.dataItem.dataContext.name
    });
  };

  const countryInfo = (
    <div
      role="presentation"
    >
      <List>
        <ListItem>
          <ListItemIcon><PublicIcon /></ListItemIcon>
          <ListItemText primary={state.countryName} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setLetterOpen(true);
          }}
        >
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary="Send letter" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <Letter
        open={letterOpen}
        onClose={() => setLetterOpen(false)}
        onSend={content => {
          setLetterOpen(false);
          sendLetter(cookies.id, state.userCountryId, state.selected, content);
          setState({ ...state, selected: null });
        }}
      />
      <Navigation
        title="Owl Mail"
        menuList={navMenu}
        backgroundColor="#012b54"
      />
      <Sidebar
        isOpen={state.selected ? true : false}
        displayUnderNavigation
        onClose={() => {setState({ ...state, selected: null, countryName: null })}}
        listItems={countryInfo}
        width="250px"
        backgroundColor="#f2f0f0"
      />
      <Map
        color="#358c4b"
        colorOnHover="#286b39"
        borderColor="#286b39"
        onCountryClick={onCountryClick}
        data={[{
          id: state.selected,
          fill: "#286b39"
        }]}
      />
    </>
  );
}