import React, { useState } from 'react';

//material ui
import { Button, Modal } from '@material-ui/core';

import Sent from './Inbox/Sent';
import './Letter.scss';

export default function Letter(props) {
  // const [state, setState] = useState(false);
  const [sent, setSent] = useState(false);
  const [letter, setLetter] = useState('');

  return (
    <>
    <Sent
      open={sent}
      onClose={() => {setSent(false)}}
    />
    <Modal open={props.open}>
      <>
      <div className="new-letter-container">
        <div className="new-letter-container-inner">
          <textarea
            id="letter"
            maxlength={props.maxlength || "700"}
            value={letter}
            onChange={e => setLetter(e.target.value)}
          />

          <div className="letter-btn-container">
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                setSent(true);
                props.onSend && props.onSend(letter);
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