import React from 'react';

// Material ui
import { Button, Modal, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import './OpenedLetter.scss';

/**
 * @param {boolean}  props.open if the letter is open or not
 * @param {function} props.onClose function when user clicks outside the borders of the letters
 * @param {function} props.onReply function that gets called when user sends letter (letter content is passed to this function)
 */
export default function Letter(props) {
  if (!props.letterData) return null;

  return (

    <Modal
      open={props.open}
      onClose={() => {
        if (props.onClose) {
          props.onClose();
        }
      }}
    >
      <div className="opened-letter-container">
        <div className="opened-letter-container-inner">

          <div className="opened-letter-header">
            <div>
              <Typography variant="h4">{props.letterData.sender}</Typography>
              <Typography variant="subtitle2">{props.letterData.sent.slice(0, 10)}</Typography>
            </div>
            <div>
              <ListItemAvatar style={{ minWidth: "90px" }}>
                <Tooltip TransitionComponent={Zoom} title={props.letterData.country.name}>
                  <img className="flag" alt={`${props.letterData.country.flag} flag`} src={props.letterData.country.flag} />
                </Tooltip>
              </ListItemAvatar>
            </div>
          </div>

          <p className="opened-letter-content">
            {props.letterData.content}
          </p>

          <div className="opened-letter-btn-container">
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                props.onReply && props.onReply();
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