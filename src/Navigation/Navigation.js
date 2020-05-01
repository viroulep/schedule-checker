import React from 'react';
import {
  Menu, Dropdown, Item, Icon,
} from 'semantic-ui-react';
import { Link } from '@reach/router';
import {
  isPartiallyActive, isExactlyActive, prefixed,
} from './utils';
import { clearAndRefresh } from '../utils';
import { signIn } from '../wca/api';

/* eslint-disable jsx-a11y/anchor-is-valid */
const Navigation = ({
  user,
  userLoading,
}) => (
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
    <Link to={prefixed('/from-wcif')} getProps={isExactlyActive}>
      Check WCIF
    </Link>
    {user && (
      <Link to={prefixed('/competitions')} getProps={isPartiallyActive}>
        My competitions
      </Link>
    )}
    {userLoading && (
      <Item className="right">
        <Icon loading name="spinner" />
      </Item>
    )}
    {user && (
      <Dropdown item text={user.name} className="right" simple>
        <Dropdown.Menu>
          <Dropdown.Item onClick={clearAndRefresh}>
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )}
    {!user && !userLoading && (
      <a href="#" className="item right" onClick={signIn}>
        Sign in with the WCA
      </a>
    )}
  </Menu>
);

export default Navigation;
