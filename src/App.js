import React from 'react';

import './App.scss';

//Material UI components


import Navigation from './Navigation'
import Map from './Map'
import Sidebar from './Sidebar'
import Register from './Register'
import Login from './Login'


function App() {



  return (
    <>
      <Navigation
        title="Owl"
        backgroundColor="#043565"
      />
      
      <Map
        color="#043565"
        colorOnHover="#5158bb"
      />
    </>
  );
}

export default App;
