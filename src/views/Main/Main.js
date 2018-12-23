import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Containers
import Header from './containers/Header';

// Views
import Query from 'views/Query';
import Table from 'views/Table';

// Styles
import styles from './Main.scss';

const Main = ({
  match,
}) => (
  <div className={styles.Root}>
    <div className={styles.Header}>
      <Header />
    </div>

    <div className={styles.Container}>
      <Switch>
        <Route path={`${match.path}/query`} component={Query} />
        <Route path={`${match.path}/table/:tableHash`} component={Table} />
      </Switch>
    </div>
  </div>
);

export default Main;
