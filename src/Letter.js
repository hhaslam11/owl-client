import React, { useState } from 'react';

// Material ui
import { Button, Modal } from '@material-ui/core';

import Sent from './Inbox/Sent';
import './Letter.scss';

/**
 * @param {boolean} props.open if the letter is open or not
 * @param {number} props.maxLength max char length of the letter
 * @param {function} props.onClose function when user clicks outside the borders of the letters
 * @param {function} props.onSend function that gets called when user sends letter (letter content is passed to this function)
 */
export default function Letter(props) {
  const [sent, setSent] = useState(false);
  const [letter, setLetter] = useState('');

  return (
    <>
      <Sent
        open={sent}
        onClose={() => {setSent(false)}}
      />
      <Modal
        open={props.open}
        onClose={() => {
          if (props.onClose) {
            props.onClose();
          }
        }}
      >
        <>
        <div className="new-letter-container">
          <div className="new-letter-container-inner">
            <textarea
              placeholder="Write your letter.."
              id="letter"
              maxLength={props.maxlength || "700"}
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