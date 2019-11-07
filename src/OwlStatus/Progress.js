
import React, { useState } from "react";

import ProgressBar from 'react-bootstrap/ProgressBar'

import './OwlStatus.scss';
import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const getProgress = (userId) => {
  axios.get(`${API_SERVER}/users/${userId}/owls`)
    .then(res => {
      const current = Date.now();
      let delivery = null;
      let sent = null;

      for (const letter of res.data.data[0].letters) {
        delivery = letter.delivery_date.getTime();
        sent = letter.sent_date.getTime();
        if ()
        if (new Date(letter.delivery_date).getTime() <= Date.now()) return false
      }
      return true;
    })
}

export default function Progress() {

  const [state, setState] = useState(1);

  // setTimeout(() => setState(state + 1), 1000);
  getProgress(499);


  return (
    <>
    <ProgressBar animated now={state} />
    </>
  )
}