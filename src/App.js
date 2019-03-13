import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose, lifecycle, withState } from 'recompose';
import url from 'url';

// Containers
import Confirm from 'containers/Confirm';
import Edit from 'containers/Edit';
import Import from 'containers/Import';
import Search from 'containers/Search';
import Transactions from 'containers/Transactions';

// Views
import Connections from './views/Connections';
import Dashboard from './views/Dashboard';

import styles from './App.scss';

import 'react-table/react-table.css';
import '@fortawesome/fontawesome-pro/css/all.min.css';

const App = ({ isConnected, match }) => (
  <div className={styles.Root}>
    {isConnected && (
      <Fragment>
        <Switch>
          <Route path={url.resolve(match.path, '/connections')} component={Connections} />
          <Route path={url.resolve(match.path, '/')} component={Dashboard} />
        </Switch>

        <Confirm />
        <Edit />
        <Import />
        <Search />
        <Transactions />
      </Fragment>
    )}
  </div>
);

export default compose(
  withState('isConnected', 'setConnected', true),
  withState('socket', 'setSocket', false),
  lifecycle({
    componentDidMount() {
      // const {
      //   setConnected,
      //   setSocket,
      // } = this.props;

      // const socket = new WebSocket('ws://localhost:3001/logger');

      // socket.onmessage = (event: Object): void => {
      //   try {
      //     const { message, data, type } = JSON.parse(get(event, 'data', '{}'));

      //     switch (type) {
      //       case 'error':
      //         // eslint-disable-next-line
      //         console.error(`%c${message}`, 'color: #f03d3d; font-weight: bold', data);
      //         break;
      //       default:
      //         // eslint-disable-next-line
      //         console.info(`%c${message}`, 'color: #0c66ff; font-weight: bold', data);
      //         break;
      //     }
      //   } catch(e) {
      //     // eslint-disable-next-line
      //     console.error(event);
      //   }
      // };

      // socket.onopen = (): void => {
      //   setConnected(true);
      //   setSocket(socket);
      // };
    },
    componentWillUnmount() {
      // const { isConnected, socket } = this.props;
      // isConnected && socket && socket.close();
    },
  })
)(App);
