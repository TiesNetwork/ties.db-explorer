import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// Components
import Progress from 'components/Progress';

// Containers
import About from './containers/About';
import Edit from './containers/Edit';
import List from './containers/List';

// Ducks
import { getConnectionsView } from './ducks/selector';

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
        <Route exact path={`${match.path}/:connectionId`} component={Edit} />
        <Route exact path={match.path} component={List} />
      </Switch>
    </div>
  </div>
);

const mapStateToProps = (state: Object): Object =>
  getConnectionsView(state);

export default connect(mapStateToProps)(Connections);
