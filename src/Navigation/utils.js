import cn from 'classnames';

const itemProps = (active) => ({
  className: cn('item', { active }),
});

export const isPartiallyActive = ({
  isPartiallyCurrent,
}) => itemProps(isPartiallyCurrent);

export const isExactlyActive = ({
  isCurrent,
}) => itemProps(isCurrent);

export const prefixed = (url) => `${process.env.PUBLIC_URL}${url}`;
