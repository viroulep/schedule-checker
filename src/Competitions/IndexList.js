import React from 'react';
import { Link } from '@reach/router';
import {
  Menu, Header, Loader, Placeholder, Dimmer, Segment, Message,
} from 'semantic-ui-react';
import cn from 'classnames';

import { getManageableCompetitions } from '../wca/api';
import { usePersistence } from '../wca/persistence';
import SyncIcon from './SyncIcon';
import './IndexList.scss';

const LoadingPlaceholder = () => (
  <>
    <Dimmer active inverted>
      <Loader active inverted />
    </Dimmer>
    <Placeholder>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder>
  </>
);

const ErrorMessage = ({ error }) => (
  <Message negative>
    Something wrong happened when loading the data:
    <pre>
      {error}
    </pre>
    Your authentification token may have expired, you may try to sign out then
    back in, or to use the &quot;Clear locally stored data&quot; option in the menu.
    <br />
    If the issue persists, it most likely means the WCA website is unreachable.
    or the WCA website is unreachable.
  </Message>
);

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
        <ErrorMessage error={error} />
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
