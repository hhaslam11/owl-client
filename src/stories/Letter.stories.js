import React from 'react';
import { storiesOf } from '@storybook/react';

import Letter from '../Letter'

storiesOf('Letter', module)
  .add('Letter', () => <Letter open/>);

/*
because im lazy:
.add('', () => {})
.add('', () => <Letter />)
*/