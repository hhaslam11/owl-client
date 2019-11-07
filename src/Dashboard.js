import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
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

const API_SERVER    = process.env.REACT_APP_API_SERVER;

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
    userCountryId: null,
    owlPresent: null
  });

  const [letterOpen, setLetterOpen] = useState(false);

  const navMenu = (
    <MenuList>
      <MenuItem onClick={() => history.push('/inbox')}>Inbox</MenuItem>
      <MenuItem onClick={() => history.push('/owls')}>My Owls</MenuItem>
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

  const isPresent = (owlData) => {
    for (const letter of owlData.data.data[0].letters) {
      if (new Date(letter.delivery_date).getTime() > Date.now()) {
        return false;
      }
    }
    return true;
  };

  const onLoad = (userID) => {
    axios.get(`${API_SERVER}/users/${userID}/owls/`, {
    })
    .then(res => {
      if (!isPresent(res)) {
        setState({
          ...state, owlPresent: false
        });
      } else if (isPresent(res)) {
        setState({
          ...state, owlPresent: true
        });
      }
    })
    .catch(e => {
      console.error(e);
    });
  };

  // useEffect(() => onLoad(cookies.id),[]);

  const owlIsPresent = (owlState) => {
    if (owlState === true) {
      return <img className="map-owl" height="400px" alt="owl logo" src="/images/owl-closed-branch-artboard-01.png"/>
    } else if (owlState === false) {
      return <img className="map-owl" height="400px" alt="owl logo - branch only " src="/images/branch-artboard-01.png"/>
    }
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
        backgroundColor="#0B1B48"
      />
      <Sidebar
        isOpen={state.selected ? true : false}
        displayUnderNavigation
        onClose={() => {setState({ ...state, selected: null, countryName: null })}}
        listItems={countryInfo}
        width="250px"
        backgroundColor="#d7eec5"
      />
      {owlIsPresent(state.owlPresent)}
      <Map
        color= "#84CA50"//"#358c4b"
        colorOnHover="#589828"//"#286b39"
        borderColor="#589828"//"#286b39"
        onCountryClick={onCountryClick}
        data={[{
          id: state.selected,
          fill: "#589828"//"#286b39"
        }]}
      />
    </>
  );
}