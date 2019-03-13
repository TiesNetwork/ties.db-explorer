/* eslint-disable */
const express = require('express');
const { array, object, string } = require('yup');
const uuidv5 = require('uuid/v5');

const app = express();

app.delete('/:id', async(req, res) => {
  const Database = await require('../database').get();
  const schema = object().shape({
    id: string().required('No connection ID!'),
  });

  schema.validate(req.params)
    .then(async({ id }) => {
      const query = await Database.collections.connections
        .findOne()
        .where('id')
        .eq(id)
        .remove();

      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.get('/', async(req, res) => {
  const Database = await require('../database').get();
  const documents = await Database.collections.connections.find().exec();

  let result = [];

  if (documents && documents.length > 0) {
    result = documents.map((document) => ({
      id: document.get('id'),
      tablespaces: document.get('tablespaces'),
      title: document.get('title'),
      url: document.get('url'),
    }));
  }

  res.send(result);
});

app.post('/', async(req, res) => {
  const Database = await require('../database').get();
  const schema = object().shape({
    address: string(),
    title: string().required('No connection title!'),
    url: string().required('No connection URL!'),
  });

  schema.validate(req.body)
    .then(async ({
      address = '',
      tablespaces = [],
      title,
      url,
    }) => {
      const id = uuidv5(title, uuidv5.URL);
      // Check exists
      const isExists = await Database.collections.connections
        .findOne()
        .where('id')
        .eq(id)
        .exec();

      if (!isExists) {
        const result = await Database.collections.connections.insert({
          address, id, tablespaces, title, url,
        });

        res.send({ id });
      } else {
        res.status(500).send({
          title: 'Is exist!',
        });
      }
    })
    .catch((error) =>
      res.status(500).send({ message: error.message }));
});

app.put('/:connectionId', async(req, res) => {
  const Database = await require('../database').get();
  const schema = object().shape({
    id: string().required('No connection ID!'),
    tablespaces: array().of(
      string()
    ).required('No tablespaces array!'),
  });

  schema.validate({ ...req.params, ...req.body })
    .then(async ({ id, tablespaces }) => {
      const query = await Database.collections.connections
        .findOne()
        .where('id')
        .eq(id)
        .update({ $set: { tablespaces }});

      res.send();
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

module.exports = app;
