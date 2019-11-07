import React from 'react';
import { storiesOf } from '@storybook/react';

import OwlStatus from '../OwlStatus/OwlStatus';
import Progress from '../OwlStatus/Progress';
import OwlStatusListItem from '../OwlStatus/OwlStatusListItem';
import 'bootstrap/dist/css/bootstrap.min.css';

storiesOf('OwlStatus', module)
  .add('Owl status page', () => <OwlStatus />)
  .add('Owl List Item', () => {
    return (
      <OwlStatusListItem
        owlName="Billy"
        owlSpeed={200}
        owlCarryCapacity={1}
      />
    )
  })
  .add('Progress bar', () => <Progress />)
  // .add('Loading', () => <Loading />)
  .add('Owl status', () => <OwlStatus />);