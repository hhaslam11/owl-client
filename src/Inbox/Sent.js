import React from 'react';

import { Modal, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import './Sent.scss';

/**
 * @param {boolean} props.open is modal visable
 * @param {boolean} props.country the destination country
 * @param {function} props.onClose the function to call when pressing the 'x' button
 */
export default function(props) {
  return (
    <Modal open={props.open}>
      <div className="sent-message">
        <div className="btn-div">
          <h2>Your letter is on its way!</h2>
          <IconButton size="small" onClick={props.onClose}><CloseIcon style={{ color: 'white' }} /></IconButton>
        </div>
        <p>
          Your owl is flying to {props.country || 'the destination'} with your letter.
        </p>
      </div>
    </Modal>
  )
}