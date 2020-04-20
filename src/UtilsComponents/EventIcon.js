import React from 'react';
import { Icon } from 'semantic-ui-react';

import '../wca/cubing-icons.css';
import './EventIcon.scss';

/* eslint-disable react/jsx-props-no-spreading */
const EventIcon = ({
  id,
  ...props
}) => (
  <Icon className={`cubing-icon event-${id}`} {...props} />
);

export default EventIcon;
