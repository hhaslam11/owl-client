
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
const getProgress = (c, s, d) => ((c - s) / (d - s)) * 100;

/**
 * @param {object} data raw data straight from api/users/:user_id/owls
 * @returns {true} if owl is present (not flying)
 * @returns {object} {deliver, sent} (timestamps in ms) if owl is currently flying
 */
const isOwlInProgress = data => {
  for (const letter of data.data.data[0].letters) {

    if (new Date(letter.delivery_date).getTime() > Date.now()) {
      return {
        delivery: new Date(letter.delivery_date).getTime(),
        sent: new Date(letter.sent_date).getTime()
      }
    }
  }
  return false;
};

export default function Progress() {
  const [state, setState] = useState(LOADING);
  const [cookies] = useCookies('user');
  
  useEffect(() => {
    axios.get(`${API_SERVER}/users/${cookies.id}/owls`)
      .then(res => {
        const owlProgress = isOwlInProgress(res);
        if (owlProgress) {
          setState(getProgress(Date.now(), owlProgress.sent, owlProgress.delivery));
        } else {
          setState(OWL_PRESENT);
        }
      })
      .catch(e => console.error(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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