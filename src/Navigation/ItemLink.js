import React from 'react';
import cn from 'classnames';
import { Link } from '@reach/router';

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
const ItemLink = ({
  prefixed,
  exact,
  to,
  ...props
}) => (
  // 'prefixed' can be used for absolute navigation and make sure gh-pages work
  <Link
    to={prefixed ? `${process.env.PUBLIC_URL}${to}` : to}
    {...props}
    getProps={exact ? isExactlyActive : isPartiallyActive}
  />
);

export default ItemLink;
