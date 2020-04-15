import React from 'react';
import { Menu } from 'semantic-ui-react'
import ItemLink from './ItemLink';

const Navigation = () => (
  <Menu pointing secondary>
    <ItemLink exact to="/">Home</ItemLink>
    <ItemLink to="settings">Settings</ItemLink>
    <ItemLink to="quick-simu">Quick simulation</ItemLink>
  </Menu>
);

export default Navigation;
