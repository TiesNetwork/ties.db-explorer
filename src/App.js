import React from 'react';
import { Route, Switch } from 'react-router-dom';
import url from 'url';

// Views
import HelloWorld from './views/HelloWorld';

import styles from './App.scss';

const App = ({ match }) => (
  <div className={styles.Root}>
    <Switch>
      <Route path={url.resolve(match.url, '/')} component={HelloWorld} />
    </Switch>
  </div>
);

export default App;
