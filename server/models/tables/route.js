const Contract = require('../../contract');
const express = require('express');
const Web3 = require('web3');
const { object, string } = require('yup');

const Tables = require('./controller');

const app = express();

app.delete('/:hash', async (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    hash: string().required('No hash'),
    name: string().required('No name'),
    tablespace: object().shape({
      hash: string().required('No tablespace hash!'),
    }).required('No tablespace hash!'),
  });

  schema.validate(req.body)
    .then(async ({ account, hash, name, tablespace }) => {
      const { hash: tablespaceHash } = tablespace;

      await Contract.sendMethod(account, 'deleteTable', {
        action: 'delete',
        data: [tablespaceHash, hash],
        entity: 'tables',
        entityHash: hash,
        payload: { hash, name },
      });

      Tables.deleteTable(tablespaceHash, hash);
      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/', async(req, res) => {
  const schema = object().shape({
    account: string().required('No account!'),
    name: string().required('No name!'),
    tablespace: object().shape({
      hash: string().required('No tablespace hash!'),
      name: string().required('No tablespace name!'),
    }).required('No tablespace hash!'),
  });

  schema.validate(req.body)
    .then(async ({ account, name, tablespace }) => {
      const {
        hash: tablespaceHash,
        name: tablespaceName,
      } = tablespace;
      const hash = Web3.utils.sha3(`${tablespaceName}#${name}`);
      const table = {
        hash, name, tablespaceHash,
        fields: [],
        indexes: [],
        triggers: [],
      };

      await Contract.sendMethod(account, 'createTable', {
        action: 'create',
        data: [tablespaceHash, name],
        entity: 'tables',
        entityHash: hash,
        payload: table,
      });

      Tables.createTable(tablespaceHash, table);
      res.send(table);
    })
    .catch((error) =>
      res.status(500).send({ message: error.message }));
});

module.exports = app;
