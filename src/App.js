import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Containers
import Edit from 'containers/Edit';
import Search from 'containers/Search';
import Transactions from 'containers/Transactions';

// Views
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';

import styles from './App.scss';
import 'react-table/react-table.css';

const App = ({ match }) => (
  <div className={styles.Root}>
    <Switch>
      <Route path={url.resolve(match.path, '/welcome')} component={Welcome} />
      <Route path={url.resolve(match.path, '/')} component={Dashboard} />
    </Switch>

    <Edit />
    <Search />
    <Transactions />
  </div>
);

export default App;
