import React from 'react';
import { useState } from 'react';

//material ui
import Grow from '@material-ui/core/Grow';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/icons/Send';

import './Letter.scss';

export default function Letter(props) {
  
  const [state, setState] = useState(false);

  const shrink = () => {
    document.getElementById('letter').className = "shrink";
    document.getElementById('letter-btn').className = "invisible";
    props.onSend && props.onSend();
  }

  return (
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
  )
}