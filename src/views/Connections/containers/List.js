import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Connect from '../components/Connect';

// Entities
import {
  deleteConnection,
  getConnectionList,
  setConnectionId,
} from 'entities/connections';

// Styles
import { GRADIENT, Typography } from 'styles';
import styles from './List.scss';

const ConnectionsList = ({
  connections = [],
  // Handlers
  handleCreate,
  handleDelete,
  handleSelect,
}): Function => (
  <div className={styles.Root}>
    <Typography
      className={styles.Title}
      variant={Typography.VARIANT.H6}
    >
      Connection List
    </Typography>

    <div className={styles.List}>
      {connections.map((item: Object, index: number): Function => (
        <Connect {...item}
          key={get(item, 'id', index)}
          onClick={handleSelect}
          onDelete={handleDelete}
        />
      ))}
    </div>

    <div className={styles.Actions}>
      <Button
        className={styles.Create}
        color={GRADIENT.PURPLE}
        icon="far fa-plus"
        onClick={handleCreate}
      >
        Create new connection
      </Button>
    </div>
  </div>
);

const mapStateToProps = (state: Object): Object => ({
  connections: getConnectionList(state),
});

export default compose(
  connect(mapStateToProps, {
    deleteConnection,
    setConnectionId,
  }),
  withHandlers({
    handleCreate: ({ history }): Function =>
      (event: Object): void =>
        history.push('/connections/create'),
    handleDelete: ({ deleteConnection }): Function =>
      (id: string): void =>
        deleteConnection(id),
    handleSelect: ({ setConnectionId }): Function =>
      (id: string): void =>
        setConnectionId(id),
  }),
)(ConnectionsList);
