/* eslint-disable */
const express = require('express');
const { array, object, string } = require('yup');

// Models
const Logger = require('../models/logger');

const app = express();
const expressWs = require('express-ws')(app);

app.ws('/', (ws, req) => {
  Logger.setSocket(ws);
});

module.exports = app;
