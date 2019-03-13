import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';

// Components
import Progress from 'components/Progress';

// Containers
import About from './containers/About';
import Edit from './containers/Edit';
import List from './containers/List';
import Tablespaces from './containers/Tablespaces';

// Ducks
import { getConnectionsView } from './ducks/selector';

// Entities
import { fetchConnections } from 'entities/connections';

// Styles
import styles from './Connections.scss';

const Connections = ({
  isFetching,
  match,
}): Function => (
  <div className={styles.Root}>
    <div className={styles.About}>
      <About />
    </div>

    <div className={styles.Container}>
      {isFetching && (
        <Progress className={styles.Progress} />
      )}

      <Switch>
        <Route exact path={`${match.path}/create`} component={Edit} />
        <Route exact path={`${match.path}/:connectionId`} component={Tablespaces} />
        <Route exact path={match.path} component={List} />
      </Switch>
    </div>
  </div>
);

const mapStateToProps = (state: Object): Object =>
  getConnectionsView(state);

export default compose(
  connect(mapStateToProps, { fetchConnections }),
  lifecycle({
    componentDidMount() {
      this.props.fetchConnections();
    },
  }),
)(Connections);
