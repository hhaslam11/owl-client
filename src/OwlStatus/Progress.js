
import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import ProgressBar from 'react-bootstrap/ProgressBar'

import './Progress.scss';
import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const LOADING = 'loading';
const OWL_PRESENT = 'owl_present';

/**
 * 
 * @param {number} currentTime current time (timestamp in ms)
 * @param {number} sentTime time letter was sent (timestamp in ms)
 * @param {number} deliveredTime time letter is/was delivered (timestamp in ms)
 * @returns {number} progress percentage of the owls travels
 */
const getProgress = (c, s, d) => {
  console.log('guess im debugging getProgress too');
  console.log(`c: ${c}\ns: ${s}\nd: ${d}`);

  let x = c - s;
  console.log('x:', x);

  let y = d - s;
  console.log('y:', y);

  let z = x / y;
  console.log('z:', z);

  console.log('return', z * 100);
  
  return z * 100;
}

/**
 * @param {object} data raw data straight from api/users/:user_id/owls
 * @returns {true} if owl is present (not flying)
 * @returns {object} {deliver, sent} (timestamps in ms) if owl is currently flying
 */
const isOwlInProgress = data => {
  console.log('we in isPresent now.');
  for (const letter of data.data.data[0].letters) {
    console.log('for loop iteration');
    console.log('Heres the current letter');
    console.log(letter);
    console.log('and a copy of the if statement');
    console.log(new Date(letter.delivery_date).getTime());
    console.log('<=');
    console.log(Date.now());
    console.log(new Date(letter.delivery_date).getTime() <= Date.now());

    if (new Date(letter.delivery_date).getTime() > Date.now()) {
      console.log('we returning the object');
      return {
        delivery: new Date(letter.delivery_date).getTime(),
        sent: new Date(letter.sent_date).getTime()
      }
    }
  }
  console.log('Returning false.');
  return false;
};



export default function Progress() {
  const [state, setState] = useState(LOADING);
  const [cookies] = useCookies('user');
  
  
  useEffect(() => {
    console.log('guess we gotta console log this shit');
    axios.get(`${API_SERVER}/users/${cookies.id}/owls`)
      .then(res => {
        console.log('request succeced, heres the res', res);
        const owlProgress = isOwlInProgress(res);
        if (owlProgress) {
          console.log('back in the axios call. !ispresnt(res) is true, should have an object now');
          console.log(res);
          setState(getProgress(Date.now(), owlProgress.sent, owlProgress.delivery));
        } else {
          console.log('back in axios call. it returned true');
          setState(OWL_PRESENT);
        }
      })
      .catch(e => console.error(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('rendering page. heres the current state: ', state);
  if (state === LOADING) return <h1>loading</h1>
  if (state === OWL_PRESENT) return <h1>present</h1>
  return (
    <>
      <div className="progress-bar-container">
        <ProgressBar animated now={state} />
        <div className="progress-info-container">
          <h6>Canada</h6>
          <h6>{state.toFixed(2)}%</h6>
          <h6>Germany</h6>
        </div>
      </div>
    </>
  )
}