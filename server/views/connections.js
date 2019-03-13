/* eslint-disable */
const express = require('express');
const app = express();

app.get('/', async(req, res) => {
  res.json([
    {
      id: 1,
      name: 'RinkeBy',
      url: 'https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337',
      ws: 'http://localhost:8080',
    },
    {
      id: 2,
      name: 'Test',
      url: 'https://localhost:8080',
      ws: 'ws://localhost:8080',
    },
  ]);
});

module.exports = app;
