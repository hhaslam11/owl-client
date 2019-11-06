import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";

// Material ui
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { TextareaAutosize, Button } from "@material-ui/core";

// Internal components
import Sidebar from '../Sidebar';
import SidebarLoading from './SidebarLoading';
import InboxListItem from '../Inbox/InboxListItem';
import Navigation from '../Navigation';

// Sass
import "./postoffice.scss";
import SidebarEmpty from './SidebarEmpty';

const API_SERVER = process.env.REACT_APP_API_SERVER;
const drawerWidth = '300px';

// Override logged in userid. Only use this for development purposes, otherwise set to null
// 93 is a good example
// 300 is a blank example
const devUserId = 93;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '70px'
  }
}));
