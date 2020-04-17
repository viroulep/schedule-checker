import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';
import {
  isPartiallyActive, isExactlyActive, prefixed,
} from './utils';


const Navigation = () => (
  <Menu pointing secondary>
    <Link to={prefixed('/')} getProps={isExactlyActive}>
      Home
    </Link>
    <Link to={prefixed('/settings')} getProps={isPartiallyActive}>
      Settings
    </Link>
    <Link to={prefixed('/quick-simu')} getProps={isPartiallyActive}>
      Quick simulation
    </Link>
  </Menu>
);

export default Navigation;
