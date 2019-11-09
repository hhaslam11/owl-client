import React from 'react';
import { storiesOf } from '@storybook/react';

import Map from '../Map';

storiesOf('Map', module)
  .add('Map skeleton', () => {
    return (<Map color="blue" />)
  })
  .add('Map with hover color', () => {
    return (
      <Map
        color="#043565"
        colorOnHover="#5158bb"
      />
    );
  })
  .add('Map with border color', () => {
    return (
      <Map
        color="#043565"
        borderColor="#5158bb"
      />
    );
  })
  .add('Map with custom country data', () => {
    const data = [{
      "id": "US",
      "fill": "#F05C5C"
    }, {
      "id": "FR",
      "fill": "yellow"
    }];

    return (
      <Map
        color="blue"
        data={data}
      />
    );
  })
  .add('Map with zoom control buttons', () => {
    return (
      <Map
        color="blue"
        addZoomControl={true}
      />
    );
  })
  .add('Map with custom size', () => {
    return (
      <Map
        color="blue"
        width="400px"
        height="300px"
      />
    );
  })
  .add('Map with onClick functionality', () => {
    
    const onClick = e => {
      console.log(e.target.dataItem.dataContext.name);
      console.log(e.target.dataItem.dataContext.id);
    };
    
    return (
      <Map
        color="blue"
        onCountryClick={onClick}
      />
    );
  })
  .add('Fully functional map', () => {
    const data = [{
      "id": "US",
      "fill": "#F05C5C"
    }, {
      "id": "FR",
      "fill": "#5C5CFF"
    }];

    return (
      <Map
        color="#043565"
        colorOnHover="#5158bb"
        borderColor="#5158bb"
        data={data}
        addZoomControl={true}
      />
    );
  });