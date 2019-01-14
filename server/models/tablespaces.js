const Contract = require('../contract');
const express = require('express');
const { get } = require('lodash');

const app = express();

app.post('/', async (req, res) => {
  const { name } = get(req, 'body', {});
  const result = await Contract.sendMethod('createTablespace', name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed');

});

module.exports = app;
