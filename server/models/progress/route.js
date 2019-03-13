/* eslint-disable */
const Contract = require('../../contract');
const Progress = require('./controller');

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

app.ws('/socket', (ws, req) => {
  Progress.setSocket(ws);

  ws.on('close', () => {
    Contract.setSocket(false);
    Progress.setSocket(false);
  });
});

module.exports = app;
