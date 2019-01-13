import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Containers
import Edit from 'containers/Edit';
import Search from 'containers/Search';

// Views
import Dashboard from './views/Dashboard';
import Init from './views/Init';
import Preload from './views/Preload';
import Welcome from './views/Welcome';

import styles from './App.scss';
import 'react-table/react-table.css';

const App = ({ match }) => (
  <div className={styles.Root}>
    <Switch>
      <Route path={url.resolve(match.path, '/preload')} component={Preload} />
      <Route path={url.resolve(match.path, '/welcome')} component={Welcome} />
      <Route path={url.resolve(match.path, '/:tablespaceHash')} component={Dashboard} />
      <Route path={url.resolve(match.path, '/')} component={Init} />
    </Switch>

    <Edit />
    <Search />
  </div>
);

export default App;
