
import React from "react";


import ProgressBar from 'react-bootstrap/ProgressBar'

import './Progress.scss';

export default function Progress(props) {
  return (
    <>
      <div className="progress-bar-container">
        <ProgressBar animated now={props.percent} />
        <div className="progress-info-container">
          <h6>{props.countryData.from}</h6>
          <h6>{props.percent.toFixed(2)}%</h6>
          <h6>{props.countryData.to}</h6>
        </div>
      </div>
    </>
  )
}