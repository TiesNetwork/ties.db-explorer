const Contract = require('../../contract');
const express = require('express');
const Web3 = require('web3');
const { array, object, string } = require('yup');

const Indexes = require('./controller');

const app = express();

app.delete('/:hash', async (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    hash: string().required('No hash'),
    name: string().required('No name'),
    table: object().shape({
      hash: string().required('No table hash!'),
    }).required('No table!'),
    tablespace: object().shape({
      hash: string().required('No tablespace hash!'),
    }).required('No tablespace hash!'),
  });

  schema.validate(req.body)
    .then(async ({ account, hash, name, table, tablespace }) => {
      const { hash: tableHash } = table;
      const { hash: tablespaceHash } = tablespace;

      await Contract.sendMethod(account, 'deleteIndex', {
        action: 'delete',
        data: [tableHash, hash],
        entity: 'indexes',
        entityHash: `${tableHash}_${hash}`,
        payload: { hash: `${tableHash}_${hash}`, name },
      });

      Indexes.deleteIndex(tablespaceHash, tableHash, `${tableHash}_${hash}`);
      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/', async(req, res) => {
  const schema = object().shape({
    account: string().required('No account!'),
    fields: array()
      .of(string().required('No field hash!'))
      .required('No fields!'),
    name: string().required('No name!'),
    type: string().required('No type!'),
    table: object().shape({
      hash: string().required('No table hash!'),
    }).required('No table!'),
    tablespace: object().shape({
      hash: string().required('No tablespace hash!'),
    }).required('No tablespace hash!'),
  });

  schema.validate(req.body)
    .then(async ({
      account,
      fields,
      name,
      table,
      tablespace,
      type,
    }) => {
      const { hash: tableHash } = table;
      const { hash: tablespaceHash } = tablespace;

      const hash = Web3.utils.sha3(name);
      const index = {
        fields, name, type,
        tableHash, tablespaceHash,
        hash: `${tableHash}_${hash}`,
        indexHash: hash,
      };

      await Contract.sendMethod(account, 'createIndex', {
        action: 'create',
        data: [tableHash, name, type, fields],
        entity: 'indexes',
        entityHash: `${tableHash}_${hash}`,
        payload: index,
      });

      Indexes.createIndex(tablespaceHash, tableHash, index);
      res.send(index);
    })
    .catch((error) =>
      res.status(500).send({ message: error.message }));
});

module.exports = app;
