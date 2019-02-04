const Contract = require('../../contract');
const express = require('express');
const Web3 = require('web3');
const { object, string } = require('yup');

const Triggers = require('./controller');

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

      await Contract.sendMethod(account, 'deleteTrigger', {
        action: 'delete',
        data: [tableHash, hash],
        entity: 'triggers',
        entityHash: `${tableHash}_${hash}`,
        payload: { hash: `${tableHash}_${hash}`, name },
      });

      Triggers.deleteTrigger(tablespaceHash, tableHash, `${tableHash}_${hash}`);
      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/', async(req, res) => {
  const schema = object().shape({
    account: string().required('No account!'),
    name: string().required('No name!'),
    payload: string().required('No payload!'),
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
      name,
      payload,
      table,
      tablespace,
    }) => {
      const { hash: tableHash } = table;
      const { hash: tablespaceHash } = tablespace;

      const hash = Web3.utils.sha3(name);
      const trigger = {
        name, payload, tableHash, tablespaceHash,
        hash: `${tableHash}_${hash}`,
        triggerHash: hash,
      };

      await Contract.sendMethod(account, 'createTrigger', {
        action: 'create',
        data: [tableHash, name, payload],
        entity: 'triggers',
        entityHash: `${tableHash}_${hash}`,
        payload: trigger,
      });

      Triggers.createTrigger(tablespaceHash, tableHash, trigger);
      res.send(trigger);
    })
    .catch((error) =>
      res.status(500).send({ message: error.message }));
});

module.exports = app;
