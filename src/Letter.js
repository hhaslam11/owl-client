import React from 'react';

//material ui
import Grow from '@material-ui/core/Grow';
import { Button, Modal } from '@material-ui/core';
import Icon from '@material-ui/icons/Send';

import './Letter.scss';

export default function Letter(props) {

  return (
    <Modal open>
      <>
      <div className="letter-container">
        <div className="letter-container-inner">
          <textarea id="letter" maxlength={props.maxlength || "700"}></textarea>

          <div className="letter-btn-container">
            <Button className="button" variant="contained">Send</Button>
          </div>
        </div>
      </div>
      
      </>
    </Modal>
  )
}

/*
    <>
      <Grow in={state}>
          <textarea id="letter" maxlength={props.maxlength || "700"}></textarea>
      </Grow>

      <Button
        id="letter-btn"
        variant="contained"
        color="primary"
        endIcon={<Icon/>}
        onClick={shrink}
      >
        Send
      </Button>
      <button onClick={() => setState(true)}>Open</button>
    </>
*/