import React from 'react';
import { storiesOf } from '@storybook/react';

import OwlStatusListItem from '../OwlStatus/OwlStatusListItem';

// Bootstrap for progress bar
import 'bootstrap/dist/css/bootstrap.min.css';

storiesOf('OwlStatus', module)
  .add('Owl List Item', () => {
    return (
      <OwlStatusListItem
        owlName="Billy"
        owlSpeed={200}
        owlCarryCapacity={1}
      />
    )
  });