/* eslint-disable */
const Contract = require('../../contract');
const { Field } = require('tiesdb-client');
const express = require('express');
const app = express();

const expressWs = require('express-ws')(app);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

app.ws('/', (ws, req) => {
  console.log(ws);
  ws.on('close', () => console.log('Close!'));

  app.get('/', async (req, res) => {
    const { tablespaces } = await Contract.callMethod('getStorage');

    await asyncForEach(tablespaces, async (tablespaceHash, index) => {
      const { name, tables = [] } = await Contract.callMethod('getTablespace', tablespaceHash);
      const part = Math.ceil(100 / tablespaces.length);
      const progress = Math.ceil(index / tablespaces.length * 100);

      ws.readyState === ws.OPEN && ws.send(JSON.stringify({ name, count: tables.length, value: 1 }));

      await asyncForEach(tables, async(tableHash, index) => {
        const {
          fields,
          indexes,
          name,
          ranges,
          replicas,
          triggers,
        } = await Contract.callMethod('getTable', tableHash);

        ws.readyState === ws.OPEN && ws.send(JSON.stringify({
          progress: progress + (part / tables.length * (index + 1)),
          value: index + 1
        }));

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

        tables[index] = {
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

      ws.readyState === ws.OPEN && ws.send(JSON.stringify({ progress: Math.ceil((index + 1) / tablespaces.length * 100) }));
    });

    res.json(tablespaces);
  });
});

module.exports = app;
