/* eslint-disable */
const Contract = require('../contract');
const Progress = require('./progress/controller');
const { Field } = require('tiesdb-client');
const express = require('express');
const app = express();

const expressWs = require('express-ws')(app);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

app.get('/', async (req, res) => {
  const { tablespaces = [] } = await Contract.callMethod('getStorage');

  await asyncForEach(tablespaces, async (tablespaceHash, index) => {
    const { name, tables = [] } = await Contract.callMethod('getTablespace', tablespaceHash);
    const progressPart = 100 / tablespaces.length;

    Progress.send({
      count: tables.length,
      current: 0,
      id: 'sync',
      title: `Sync tablespace «${name}»`,
      type: 'progress',
      value: progressPart * index,
    });

    await asyncForEach(tables, async(tableHash, tableIndex) => {
      const {
        fields,
        indexes,
        name,
        ranges,
        replicas,
        triggers,
      } = await Contract.callMethod('getTable', tableHash);

      Progress.send({
        count: tables.length,
        current: tableIndex,
        id: 'sync',
        type: 'progress',
        value: progressPart * index + progressPart / tables.length * tableIndex,
      });

      await asyncForEach(fields, async(fieldHash, index) => {
        const {
          def: defaultValue,
          fType: type,
          name,
        } = await Contract.callMethod('getField', tableHash, fieldHash);

        let decodedDefaultValue = defaultValue || '0';

        try {
          decodedDefaultValue = Field.decodeValue(
            type.toLowerCase(),
            Buffer.from(defaultValue.replace('0x', ''), 'hex'),
          ).toString();
        } catch (e) {}

        fields[index] = {
          fieldHash, name, tableHash, tablespaceHash, type,
          defaultValue: decodedDefaultValue,
          hash: `${tableHash}_${fieldHash}`,
        };
      });

      await asyncForEach(indexes, async(indexHash, index) => {
        const {
          fields,
          iType: type,
          name,
        } = await Contract.callMethod('getIndex', tableHash, indexHash);

        indexes[index] = {
          fields, indexHash, name, tableHash, tablespaceHash, type,
          hash: `${tableHash}_${indexHash}`,
        };
      });

      await asyncForEach(triggers, async(triggerHash, index) => {
        const { name, payload } = await Contract.callMethod('getTrigger', tableHash, triggerHash);

        triggers[index] = {
          name, payload, tableHash, tablespaceHash, triggerHash,
          hash: `${tableHash}_${triggerHash}`,
        };
      });

      tables[tableIndex] = {
        tablespaceHash,
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


  Progress.send({
    id: 'sync',
    title: 'Sync completed',
    type: 'success',
  });
});

module.exports = app;
