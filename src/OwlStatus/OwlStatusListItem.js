import React from "react";

import './OwlStatus.scss';


/**
 * 
 * @param {string} props.owlName
 * @param {number} props.owlSpeed
 * @param {number} props.owlCarryCapacity
 */
export default function OwlStatusListItem(props) {

  if (!props.owlName || !props.owlSpeed || !props.owlCarryCapacity) {
    console.error(`Invalid props\n owlName: ${props.owlName}\n owlSpeed: ${props.owlSpeed}\n owlCarryCapacity: ${props.owlCarryCapacity}`);
    return null;
  }

  return (
    <div className="owl-status-list-item">
      
      <img alt="owl" src="/images/owl-closed-branch.png" />
      <div className="info-box">
        <h1>{props.owlName}</h1>
        <h5>Speed: {props.owlSpeed}</h5>
        <h5>Carrying Capacity: {props.owlCarryCapacity}</h5>
      </div>
      <div className="owl-progress">
        help?
      </div>

    </div>
  )
}