import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import './OwlStatus.scss';
import Progress from "./Progress";

import axios from "axios";

const LOADING = 'loading';
const OWL_PRESENT = 'owl_present';
const API_SERVER = process.env.REACT_APP_API_SERVER;

/**
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
        sent: new Date(letter.sent_date).getTime(),
        owlData: {
          name: data.data.data[0].owl[0].name,
          speed: data.data.data[0].owl[0].speed,
          capacity: data.data.data[0].owl[0].carrying_capacity
        }
      }
    }
  }
  return false;
};

/**
 * 
 * @param {string} props.owlName
 * @param {number} props.owlSpeed
 * @param {number} props.owlCarryCapacity
 */
export default function OwlStatusListItem(props) {
  const [cookies] = useCookies('user');
  const [state, setState] = useState(LOADING);
  const [countryData, setCountryData] = useState({
    from: '',
    to: ''
  });
  const [owlData, setOwlData] = useState({
    name: '',
    speed: '',
    capacity: ''
  });

  useEffect(() => {
    axios.get(`${API_SERVER}/users/${cookies.id}/owls`)
      .then(res => {
        const owlProgress = isOwlInProgress(res);
        if (owlProgress) {
          setCountryData({ //TODO add proper country data here
            from: 'Canada',
            to: 'Germany'
          });
          console.log(owlProgress);
          setOwlData(owlProgress.owlData);
          setState(getProgress(Date.now(), owlProgress.sent, owlProgress.delivery));
        } else {
          setState(OWL_PRESENT);
        }
      })
      .catch(e => console.error(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === LOADING) return <h1>loading</h1>
  if (state === OWL_PRESENT) return <h1>present</h1>

  return (
    <div className="owl-status-list-item">
      
      <img alt="owl" src="/images/owl-closed-branch.png" />
      <div className="info-box">
        <h1>{owlData.name}</h1>
        <h5>Speed: {owlData.speed}</h5>
        <h5>Carrying Capacity: {owlData.capacity}</h5>
      </div>
      <div className="owl-progress">
        <Progress
          countryData={countryData}
          percent={state}
        />
      </div>

    </div>
  )
}