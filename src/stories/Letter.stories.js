import React from 'react';
import { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Letter from '../Letter'

storiesOf('Letter', module)
  .add('Letter', () => <Letter open/>)
  .add('Letter with toggle', () => {
    const [state, setState] = useState(false);
    const [text, setText]   = useState(false);

    return (
      <>
        <h2>Content:</h2>
        <p>{text}</p>
        <button onClick={() => setState(true)}>Open</button>
        <Letter
          open={state}
          onClose={() => setState(false)}
          onSend={(text) => {
            setText(text);
            setState(false);
          }}
        />
      </>
    )
  });

/*
because im lazy:
.add('', () => {})
.add('', () => <Letter />)
*/