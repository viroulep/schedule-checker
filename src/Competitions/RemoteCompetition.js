import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

import { usePersistence } from '../wca/persistence';
import { competitionWcifUrl } from '../wca/routes';
import Competition from './Competition';
import SyncIcon from './SyncIcon';
import LoadingError from '../UtilsComponents/LoadingError';
import LoadingPlaceholder from '../UtilsComponents/LoadingPlaceholder';

const RemoteCompetition = ({
  competitionId,
  simulator,
}) => {
  const {
    loadedData, loading, error, sync,
  } = usePersistence(
    `competitions.${competitionId}`,
    competitionWcifUrl(competitionId),
  );
  const { data, lastFetched } = loadedData;
  return (
    <>
      <Header as="h1" className="my-comps">
        {data ? (
          data.name
        ) : (
          competitionId
        )}
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
        <Competition compWcif={data} simulator={simulator} />
      )}
    </>
  );
};

export default RemoteCompetition;
