/* eslint-disable */
const Contract = require('../../contract');
// const Progress = require('../progress/controller');
const Schema = require('./controller');
const { Field } = require('tiesdb-client');
const express = require('express');
const app = express();

const expressWs = require('express-ws')(app);

app.get('/', async (req, res) => {
  const schema = await Schema.fetch();
  res.send(JSON.stringify(schema));
});

app.ws('/', (ws, req) => {
  Schema.setSocket(ws);

  ws.on('close', () => {
    Schema.setSocket(false);
  });
});

module.exports = app;
