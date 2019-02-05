import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Containers
import Confirm from 'containers/Confirm';
import Edit from 'containers/Edit';
import Import from 'containers/Import';
import Search from 'containers/Search';
import Transactions from 'containers/Transactions';

// Views
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';

import styles from './App.scss';

import 'react-table/react-table.css';
import '@fortawesome/fontawesome-pro/css/all.min.css';

const App = ({ match }) => (
  <div className={styles.Root}>
    <Switch>
      <Route path={url.resolve(match.path, '/welcome')} component={Welcome} />
      <Route path={url.resolve(match.path, '/')} component={Dashboard} />
    </Switch>

    <Confirm />
    <Edit />
    <Import />
    <Search />
    <Transactions />
  </div>
);

export default App;
