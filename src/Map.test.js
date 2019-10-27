import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Map />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders with props without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Map
    color="#043565"
    colorOnHover="#5158bb"
    data={[{
      "id": "US",
      "fill": "#F05C5C"
    }]}
    addZoomControl={true}
  />);
  ReactDOM.unmountComponentAtNode(div);
});
