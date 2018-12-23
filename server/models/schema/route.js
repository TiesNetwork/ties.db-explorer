/* eslint-disable */
const Contract = require('../../contract');
const express = require('express');
const schema = express();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

schema.get('/', async (req, res) => {
  const { tablespaces } = await Contract.callMethod('getStorage');

  await asyncForEach(tablespaces, async (tablespaceHash, index) => {
    const { name, tables = [] } = await Contract.callMethod('getTablespace', tablespaceHash);

    await asyncForEach(tables, async(tableHash, index) => {
      const {
        fields,
        indexes,
        name,
        ranges,
        replicas,
        triggers,
      } = await Contract.callMethod('getTable', tableHash);

      await asyncForEach(fields, async(fieldHash, index) => {
        const {
          def: defaultValue,
          fType: type,
          name,
        } = await Contract.callMethod('getField', tableHash, fieldHash);

        fields[index] = {
          defaultValue, name, type,
          hash: fieldHash,
        };
      });

      await asyncForEach(indexes, async(indexHash, index) => {
        const {
          fields,
          iType: type,
          name,
        } = await Contract.callMethod('getIndex', tableHash, indexHash);

        indexes[index] = {
          fields, name, type,
          hash: indexHash,
        };
      });

      await asyncForEach(triggers, async(triggerHash, index) => {
        const { name, payload } = await Contract.callMethod('getTrigger', tableHash, triggerHash);

        triggers[index] = {
          name, payload,
          hash: triggerHash,
        };
      });

      tables[index] = {
        hash: tableHash,
        name,
        fields, indexes, triggers,
        ranges, replicas,
      };
    });

    tablespaces[index] = {
      hash: tablespaceHash,
      name, tables,
    };
  });

  res.json(tablespaces);
});

module.exports = schema;
