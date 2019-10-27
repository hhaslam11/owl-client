import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from '../Map'

storiesOf('Map', module)
  .add('Map', () => {
    
    const data = [{
      "id": "US",
      "fill": "#F05C5C"
    }, {
      "id": "FR",
      "fill": "#5C5CFF"
    }]

    return (
      <Map
        color="#043565"
        colorOnHover="#5158bb"
        data={data}
        addZoomControl={true}
      />
    );
  });