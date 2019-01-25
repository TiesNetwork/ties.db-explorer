const Contract = require('../contract');
const express = require('express');
const { get } = require('lodash');
const Web3 = require('web3');

const app = express();

app.post('/', async (req, res) => {
  const { name } = get(req, 'body', {});
  const hash = Web3.utils.sha3(name);

  const result = await Contract.sendMethod('createTablespace', {
    action: 'create',
    data: [name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed'],
    entity: 'tablespaces',
    entityHash: hash,
    payload: {
      hash,
      name,
    }
  });
});

module.exports = app;
