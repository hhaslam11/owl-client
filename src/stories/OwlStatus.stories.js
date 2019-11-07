import React from 'react';
import { storiesOf } from '@storybook/react';

import OwlStatus from '../OwlStatus/OwlStatus';
import OwlStatusListItem from '../OwlStatus/OwlStatusListItem';

storiesOf('OwlStatus', module)
  .add('Owl status page', () => <OwlStatus />)
  .add('Owl Avatar', () => <OwlStatus />)
  .add('Owl List Item', () => {
    return (
      <OwlStatusListItem
        owlName="Billy"
        owlSpeed={200}
        owlCarryCapacity={1}
      />
    )
  })
  .add('Progress bar', () => <OwlStatus />)
  .add('Owl status', () => <OwlStatus />);