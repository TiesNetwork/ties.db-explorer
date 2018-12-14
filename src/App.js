import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Views
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';

import styles from './App.scss';
import 'react-table/react-table.css';

const App = ({ match }) => (
  <div className={styles.Root}>
    <Switch>
      <Route path={url.resolve(match.url, '/welcome')} component={Welcome} />
      <Route path={url.resolve(match.url, '/')} component={Dashboard} />
    </Switch>
  </div>
);

export default App;
