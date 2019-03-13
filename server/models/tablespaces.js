/* eslint-disable */
const Contract = require('../contract');
const express = require('express');
const { get } = require('lodash');
const Web3 = require('web3');
const { object, string } = require('yup');

const Schema = require('./schema/controller');

const app = express();

const forEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

app.get('/', async(req, res) => {
  const { tablespaces = [] } = await Contract.callMethod('getStorage');

  await forEach(tablespaces, async(tablespaceHash, index) => {
    const { name } = await Contract.callMethod('getTablespace', tablespaceHash);

    tablespaces[index] = {
      name, hash: tablespaceHash,
    };
  });

  res.send(tablespaces);
});

app.delete('/:hash', async (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    hash: string().required('No hash'),
    name: string().required('No name'),
  });

  schema.validate(req.body)
    .then(async ({ account, hash, name }) => {
      await Contract.sendMethod(account, 'deleteTablespace', {
        action: 'delete',
        data: [hash],
        entity: 'tablespaces',
        entityHash: hash,
        payload: { hash, name },
      });

      Schema.deleteTablespace(hash);
      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/', async (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    name: string().required('No name'),
  });

  schema.validate(req.body)
    .then(async ({ account, name }) => {
      const hash = Web3.utils.sha3(name);
      const tablespace = { hash, name, tables: [] };

      await Contract.sendMethod(account, 'createTablespace', {
        action: 'create',
        data: [name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed'],
        entity: 'tablespaces',
        entityHash: hash,
        payload: tablespace,
      });

      Schema.createTablespace(hash, tablespace);
      res.send(tablespace);
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

module.exports = app;
