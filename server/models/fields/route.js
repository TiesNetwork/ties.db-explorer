const Contract = require('../../contract');
const express = require('express');
const { Field } = require('tiesdb-client');
const Web3 = require('web3');
const { object, string } = require('yup');

const Fields = require('./controller');

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
      console.log(tablespaceHash, tableHash,  `${tableHash}_${hash}`);
      await Contract.sendMethod(account, 'deleteField', {
        action: 'delete',
        data: [tableHash, hash],
        entity: 'fields',
        entityHash: `${tableHash}_${hash}`,
        payload: { hash: `${tableHash}_${hash}`, name },
      });

      Fields.deleteField(tablespaceHash, tableHash, `${tableHash}_${hash}`);
      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/', async(req, res) => {
  const schema = object().shape({
    account: string().required('No account!'),
    defaultValue: string().required('No default value!'),
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
      defaultValue,
      name,
      table,
      tablespace,
      type,
    }) => {
      const { hash: tableHash } = table;
      const { hash: tablespaceHash } = tablespace;

      const hash = Web3.utils.sha3(name);
      const encodedValue = Field.encodeValue(
        type.toLowerCase(), defaultValue);
      const field = {
        defaultValue, name, type,
        hash: `${tableHash}_${hash}`,
        fieldHash: hash,
      };

      await Contract.sendMethod(account, 'createField', {
        action: 'create',
        data: [tableHash, name, type, encodedValue],
        entity: 'fields',
        entityHash: `${tableHash}_${hash}`,
        payload: field,
      });

      Fields.createField(tablespaceHash, tableHash, field);
      res.send(field);
    })
    .catch((error) =>
      res.status(500).send({ message: error.message }));
});

module.exports = app;
