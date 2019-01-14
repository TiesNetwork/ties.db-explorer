/* eslint-disable */
const Contract = require('../contract');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);


app.ws('/', (ws, req) => {
  Contract.setSocket(ws);
  ws.readyState === ws.OPEN && ws.send('Hello world!');
});

module.exports = app;
