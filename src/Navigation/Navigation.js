import React from 'react';
import { Menu } from 'semantic-ui-react'
import ItemLink from './ItemLink';

const Navigation = () => (
  <Menu pointing secondary>
    <ItemLink exact prefixed to="/">Home</ItemLink>
    <ItemLink prefixed to="/settings">Settings</ItemLink>
    <ItemLink prefixed to="/quick-simu">Quick simulation</ItemLink>
  </Menu>
);

export default Navigation;
