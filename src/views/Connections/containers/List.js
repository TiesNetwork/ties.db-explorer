import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

// Components
import Button from 'components/Button';
import Connect from '../components/Connect';

// Entities
import {
  fetchConnections,
  getConnectionList,
} from 'entities/connections';

// Styles
import { GRADIENT, Typography } from 'styles';
import styles from './List.scss';

const ConnectionsList = ({
  connections = [],
  handleCreate,
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
        <Connect {...item} key={index} />
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
  connect(mapStateToProps, { fetchConnections }),
  withHandlers({
    handleCreate: ({ history }): Function =>
      (event: Object): void =>
        history.push('/connections/create'),
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchConnections();
    },
  }),
)(ConnectionsList);
