import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import './App.scss';

import Dashboard from './Dashboard';
import Landing from './Landing';


export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [state, setState] = useState({
    loggedIn: cookies.id ? true : false
  });

  const login = (userId) => {
    if (!userId) {
      console.error(`Something went wrong. Received a user id of: ${userId}`);
      return;
    }

    setCookie('id', userId);
    setState({ ...state, loggedIn: true });
  };

  const logout = () => {
    removeCookie('id');
    setState({ ...state, loggedIn: false });
  };
  
  useEffect(() => {
    console.log(`
    ／￣￣￣￣￣￣\\
    |　Welcome! |
    ＼＿＿ ＿＿＿/
    　　　∨
      __________
    / ___  ___ \\
    / / @ \\/ @ \\ \\
    \\ \\___/\\___/ /\\
    \\____\\/____/||
    /     /\\\\\\\\\\//
    |     |\\\\\\\\\\\\
    \\      \\\\\\\\\\\\
      \\______/\\\\\\\\
       _||_||_
      `);
  }, []);

  return (
    <>
      {state.loggedIn ? <Dashboard logout={logout} /> : <Landing login={id => login(id)} />}
    </>
  );
}