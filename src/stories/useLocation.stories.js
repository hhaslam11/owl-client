import React from 'react';
import { useState, useEffect } from 'react';
import useLocation from '../hooks/useLocation'
import { storiesOf } from '@storybook/react';

storiesOf('useLocation hook', module)
  .add('get data', () => {

    const [state, setState] = useState('');

    useEffect(() => {

      useLocation(countryCode => {
        setState(countryCode);
      });

    }, []);



    return (
      <>
        <h4>country code: {state || 'not found'}</h4>
      </>
    )
  });