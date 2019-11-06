import React, { useState } from 'react';

//material ui
import { Button, Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Sent from './Inbox/Sent';
import './Letter.scss';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';



/**
 * @param {boolean} props.open if the letter is open or not
 * @param {function} props.onClose function when user clicks outside the borders of the letters
 * @param {function} props.onReply function that gets called when user sends letter (letter content is passed to this function)
 */
export default function Letter(props) {
  const [sent, setSent] = useState(false);
  const [letter, setLetter] = useState(props.letterData);

  return (

    <Modal
      open={props.open}
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <div className="new-letter-container">
        <div className="new-letter-container-inner">

          <ListItemAvatar style={{minWidth: "90px"}}>
            <img className="flag" alt={`${props.country} flag`} src={props.letterData.flag} />
          </ListItemAvatar>

          <Typography variant="h4">{props.letterData.username}</Typography>
          <Typography variant="subtitle2">{props.letterData.sent_date.slice(0,10)}</Typography>

          <p className="letter-content">
            {props.letterData.content}
          </p>
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
                props.onReply && props.onReply(letterID);
              }}
            >
              Reply
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
