import { get } from 'lodash';
import React from 'react';
import { compose, lifecycle, withState } from 'recompose';

const Transactions = () => (
  <div />
);

export default compose(
  withState('isConnected', 'setConnected', false),
  withState('socket', 'setSocket', false),
  lifecycle({
    componentDidMount() {
      const {
        setConnected,
        setSocket,
      } = this.props;

      const socket = new WebSocket('ws://localhost:3001/transactions');

      socket.onmessage = (event: Object): void => {
        const data = JSON.parse(get(event, 'data', ''));
        console.log(data);
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
