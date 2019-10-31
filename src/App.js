import React from 'react';
import { useState } from 'react';

import './App.scss';

import Dashboard from './Dashboard';
import Landing from './Landing';

export default function App() {
  const [state, setState] = useState({
    loggedIn: true,
    userId: null
  });
  
  return (
    <>
      {state.loggedIn ? <Dashboard logout={() => {setState({ ...state, loggedIn: false })}} /> : <Landing login={() => {setState({ ...state, loggedIn: true })}} />}
    </>
  );
}