/* eslint-disable */
const express = require('express');
const { get } = require('lodash');
const nodeEth = require('node-eth-address');
const { object, string } = require('yup');

const app = express();

app.delete('/:hash', async (req, res) => {
  const Database = await require('../../database').get();
  const { hash } = req.params;

  const schema = object().shape({
    hash: string().required('No hash'),
  });

  schema.validate(req.params)
    .then(async () => {
      const query = await Database.collections.accounts
        .find()
        .where('hash')
        .eq(hash)
        .remove();

      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.get('/', async (req, res) => {
  const Database = await require('../../database').get();
  const documents = await Database.collections.accounts.find().exec();

  if (documents) {
    const result = documents.map((document) => ({
      hash: `0x${document.get('json.address')}`,
      name: document.get('name'),
      json: document.get('json'),
    }));

    res.send(result);
  }
});

app.post('/', async (req, res) => {
  const Database = await require('../../database').get();
  const { json, name, password } = req.body;

  const schema = object().shape({
    json: object().required('No JSON'),
    name: string().required('No name'),
    password: string().required('No password'),
  });

  schema.validate(req.body)
    .then(async (data) => {
      try {
        const hash = get(json, 'address');
        const privateKey = nodeEth.recoverPrivateKey(password, json);

        if (hash && privateKey) {
          const result = await Database.collections.accounts.insert({
            json, name,
            hash: `0x${hash}`,
          });
        }

        privateKey && res.send({
          json, name, privateKey,
          hash: `0x${hash}`,
        });
      } catch(error) {
        res.status(500).send({ message: error.message });
      }
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.put('/:hash', async(req, res) => {
  const Database = await require('../../database').get();
  const { hash } = req.params;

  const schema = object().shape({
    hash: string().required('No hash'),
    payload: object().shape({
      name: string().required('No name'),
    }),
  });

  schema.validate({ ...req.params, ...req.body })
    .then(async () => {
      const query = await Database.collections.accounts
        .find()
        .where('hash')
        .eq(hash)
        .update({ $set: { name: get(req, 'body.payload.name') }});

      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

module.exports = app;
