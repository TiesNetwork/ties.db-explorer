/* eslint-disable */
const express = require('express');
const { get } = require('lodash');
const nodeEth = require('node-eth-address');

const app = express();

app.post('/', (req, res) => {
  const { json, name, password } = req.body;

  if (json && name && password) {
    try {
      const privateKey = nodeEth.recoverPrivateKey(password, json);

      privateKey && res.send({
        json, name, privateKey,
        hash: `0x${get(json, 'address')}`,
      });
    } catch(e) {
      res.status(500).send({ message: e.message });
    }
  }
});

module.exports = app;
