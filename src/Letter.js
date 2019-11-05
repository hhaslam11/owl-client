import React, { useState } from 'react';

//material ui
import { Button, Modal } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './Letter.scss';

export default function Letter(props) {
  const [state, setState] = useState(props);
  
  //Open and close snackbar
  const [snack, setSnack] = useState(false);
  const [letter, setLetter] = useState('');

  return (
    <>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={snack}
      autoHideDuration={6000}
      onClose={() => setSnack(false)}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Your letter is on it's way!</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          // className={classes.close}
          onClick={() => setSnack(false)}
        >
          <CloseIcon />
        </IconButton>,
      ]}
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
                setSnack(true);
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