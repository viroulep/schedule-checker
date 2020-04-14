import React from 'react';
import { Link } from '@reach/router';
import cn from 'classnames';

const itemProps = (active) => ({
  className: cn('item', { active }),
});

const isPartiallyActive = ({
  isPartiallyCurrent,
}) => itemProps(isPartiallyCurrent);

const isExactlyActive = ({
  isCurrent,
}) => itemProps(isCurrent);

/* eslint-disable react/jsx-props-no-spreading */
const ItemLink = ({ exact, ...props }) => (
  <Link
    {...props}
    getProps={exact ? isExactlyActive : isPartiallyActive}
  />
);

export default ItemLink;
