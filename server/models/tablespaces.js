const Contract = require('../contract');
const express = require('express');
const { get } = require('lodash');
const Web3 = require('web3');
const { object, string } = require('yup');

const app = express();

app.post('/', async (req, res) => {

  const schema = object().shape({
    account: string().required('No account'),
    name: string().required('No name'),
  });

  schema.validate(req.body)
    .then(async ({ account, name }) => {
      console.log(123);
      const hash = Web3.utils.sha3(name);
      const result = await Contract.sendMethod(account, 'createTablespace', {
        action: 'create',
        data: [name, '0x29a60CeA1aDED2EF4B64Ed219Acdb0F351B5ADed'],
        entity: 'tablespaces',
        entityHash: hash,
        payload: {
          hash,
          name,
        }
      });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
});

module.exports = app;
