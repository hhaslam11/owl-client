import React, { useState } from 'react';

//material ui
import { Button, Modal } from '@material-ui/core';

import Sent from './Inbox/Sent';
import './Letter.scss';

export default function Letter(props) {
  const [state, setState] = useState(props);
  const [sent, setSent] = useState(false);
  const [letter, setLetter] = useState('');

  return (
    <>
    <Sent
      open={sent}
      onClose={() => {setSent(false)}}
    />
    <Modal open={state}>
      <>
      <div className="letter-container">
        <div className="letter-container-inner">
          <textarea
            id="letter"
            maxlength={props.maxlength || "700"}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />

          <div className="letter-btn-container">
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                setSent(true);
                setState(false);
                props.cb(letter);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      
      </>
    </Modal>
    </>
  )
}