import React, { useState } from 'react';

//material ui
import { Button, Modal } from '@material-ui/core';


import './Letter.scss';

export default function Letter(props) {
  const [state, setState] = useState(props);
  const [letter, setLetter] = useState('');

  return (
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