import React from 'react';
import { Link } from '@reach/router';
import {
  Menu, Header, Segment,
} from 'semantic-ui-react';
import cn from 'classnames';

import { getManageableCompetitions } from '../wca/api';
import { usePersistence } from '../wca/persistence';
import SyncIcon from './SyncIcon';
import LoadingError from '../UtilsComponents/LoadingError';
import LoadingPlaceholder from '../UtilsComponents/LoadingPlaceholder';
import './IndexList.scss';

const Competitions = ({
  competitions,
}) => (
  <Menu vertical fluid className="competitions-list">
    {competitions.map((comp) => (
      <Link
        key={comp.id}
        to={comp.id}
        className={cn('item', {
          'not-announced': !comp.announced_at,
        })}
      >
        {comp.name}
      </Link>
    ))}
  </Menu>
);

const IndexList = () => {
  const {
    loadedData, loading, error, sync,
  } = usePersistence('competitions.index', getManageableCompetitions);
  const { data, lastFetched } = loadedData;
  return (
    <>
      <Header className="my-comps">
        My recent competitions
        <SyncIcon
          loading={loading}
          sync={sync}
          lastFetched={lastFetched}
        />
      </Header>
      {error && (
        <LoadingError error={error} />
      )}
      {loading && (
        <Segment>
          <LoadingPlaceholder />
        </Segment>
      )}
      {!loading && data && (
        <Competitions competitions={data} />
      )}
    </>
  );
};

export default IndexList;
