import React from 'react';
import { storiesOf } from '@storybook/react';

import Navigation from '../Navigation'

storiesOf('Navigation', module)
  .add('Navigation', () => <Navigation/>)
  .add('with custom background color', () => <Navigation backgroundColor='pink' />)
  .add('with custom title', () => <Navigation title="Pretty Cool App" />)
  .add('with custom text color', () => <Navigation color="yellow" />);

/*
because im lazy:
.add('', () => {})
.add('', () => <Navigation />)
*/