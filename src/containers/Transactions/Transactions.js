import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';

// Entities
import { saveTransaction } from 'entities/transactions';

const Transactions = () => (
  <div />
);

export default compose(
  connect(null, { saveTransaction }),
  withState('isConnected', 'setConnected', false),
  withState('socket', 'setSocket', false),
  lifecycle({
    componentDidMount() {
      const {
        saveTransaction,
        setConnected,
        setSocket,
      } = this.props;

      const socket = new WebSocket('ws://localhost:3001/transactions/socket');

      socket.onmessage = (event: Object): void => {
        try {
          const { hash, ...payload } = JSON.parse(get(event, 'data', ''));
          hash && saveTransaction(hash, payload);
        } catch(e) { } // eslint-disable-line
      };

      socket.onopen = (): void => {
        setConnected(true);
        setSocket(socket);
      };
    },
    componentWillUnmount() {
      const { isConnected, socket } = this.props;
      isConnected && socket && socket.close();
    },
  })
)(Transactions);
