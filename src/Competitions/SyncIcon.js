import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const SyncIcon = ({
  loading,
  sync,
  lastFetched,
}) => {
  const syncIcon = (
    <Icon
      link
      name="sync"
      size="small"
      loading={loading}
      onClick={sync}
    />
  );
  return (
    <>
      {lastFetched ? (
        <Popup
          trigger={syncIcon}
          content={`Last fetched on ${new Date(lastFetched).toLocaleString()}`}
          size="small"
          wide
          position="bottom center"
        />
      ) : (
        syncIcon
      )}
    </>
  );
};

export default SyncIcon;
