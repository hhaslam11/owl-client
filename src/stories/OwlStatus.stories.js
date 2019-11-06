import React from 'react';
import { storiesOf } from '@storybook/react';

import OwlStatus from '../OwlStatus/OwlStatus';

storiesOf('OwlStatus', module)
  .add('Owl status page', () => <OwlStatus />)
  .add('Owl Avatar', () => <OwlStatus />)
  .add('Owl List Item', () => <OwlStatus />)
  .add('Progress bar', () => <OwlStatus />)
  .add('Owl status', () => <OwlStatus />);