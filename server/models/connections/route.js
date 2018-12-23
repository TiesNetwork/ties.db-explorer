/* eslint-disable */
const express = require('express');
const connections = express();

connections.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'RinkeBy',
      url: 'https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337',
      ws: 'http://localhost:8080',
    },
  ]);
});

connections.delete('/:id', (req, res) => {
  res.send('Delete connection!');
});

connections.post('/:id', (req, res) => {
  res.send('Create connection');
});

connections.put('/:id', (req, res) => {
  res.send('Update connection');
});

module.exports = connections;
