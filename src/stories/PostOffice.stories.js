import React from 'react';
import { storiesOf } from '@storybook/react';

import PostOffice from '../PostOffice/PostOffice';

storiesOf('Post Office', module)
  .add('Post Office', () => <PostOffice/>);