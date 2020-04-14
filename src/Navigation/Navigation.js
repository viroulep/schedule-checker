import React from 'react';
import { Menu } from 'semantic-ui-react'
import ItemLink from './ItemLink';

const Navigation = () => (
  <Menu pointing secondary>
    <ItemLink exact to="/">Home</ItemLink>
    <ItemLink to="settings">Settings</ItemLink>
    <ItemLink to="dummy">Dummy</ItemLink>
  </Menu>
);

export default Navigation;
