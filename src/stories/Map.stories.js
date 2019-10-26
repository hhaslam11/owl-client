import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { storiesOf } from '@storybook/react';

import Map from '../Map'

storiesOf('Map', module)
  .add('Map', () => (
    <Map>
    </Map>
  ));