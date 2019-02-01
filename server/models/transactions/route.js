/* eslint-disable */
const Contract = require('../../contract');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const { array, object, string } = require('yup');

app.post('/confirm', (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    privateKey: string().required('No private key'),
    transactions: array().of(string()).required('No transactions'),
  });

  schema.validate(req.body)
    .then(async ({ account, privateKey, transactions }) => {
      Contract.confirm({account, privateKey, transactions }, () => res.send());
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.post('/private', (req, res) => {
  const schema = object().shape({
    account: string().required('No account'),
    password: string().required('No password'),
  });

  schema.validate(req.body)
    .then(async ({ account, password }) => {
      const privateKey = await Contract.getPrivateKey(account, password);
      res.send({ privateKey });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

app.ws('/', (ws, req) => {
  Contract.setSocket(ws);
  ws.readyState === ws.OPEN && ws.send('Hello world!');
});

module.exports = app;
