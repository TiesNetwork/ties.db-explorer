import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Containers
import Header from './containers/Header';

// Views
import Query from 'views/Query';
import Table from 'views/Table';

// Styles
import { Typography } from 'styles';
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
        <Route path={url.resolve(match.url, '/query')} component={Query} />
        <Route path={url.resolve(match.url, '/table')} component={Table} />
      </Switch>
    </div>
  </div>
);

export default Main;
