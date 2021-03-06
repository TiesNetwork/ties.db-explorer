/* eslint-disable */
const { set } = require('lodash');
const Contract = require('../../contract');
const { Field } = require('tiesdb-client');
const Progress = require('../progress/controller');

class Schema {
  constructor() {
    this.isFetching = false;
    this.schema = null;
    this.socket = null;
  }

  async forEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async fetch() {
      console.log(Contract.getConnectionId());
    if (!this.isFetching && !this.schema) {
      this.isFetching = true;
      const { tablespaces = [] } = await Contract.callMethod('getStorage');
      const Database = await require('../../database').get();

      const connection = await Database.collections.connections
        .findOne()
        .where('id')
        .eq(Contract.getConnectionId())
        .exec();

      const connectionTablespaces = connection && connection.get('tablespaces');

      const filteredTablespaces = connection && connectionTablespaces && connectionTablespaces.length > 0
        ? tablespaces.filter((tablespaceHash) => connectionTablespaces.indexOf(tablespaceHash) > -1)
        : tablespaces;

      await this.forEach(filteredTablespaces, async (tablespaceHash, index) => {
        const { name: tablespaceName, tables = [] } = await Contract.callMethod('getTablespace', tablespaceHash);
        const progressPart = 100 / filteredTablespaces.length;

        Progress.send({
          count: tables.length,
          current: 0,
          id: 'sync',
          title: `Sync tablespace: «${tablespaceName}»`,
          subTitle: null,
          type: 'progress',
          value: progressPart * (index + 1),
        });

        this.send({
          entity: 'tablespaces',
          hash: tablespaceHash,
          payload: { hash: tablespaceHash, name: tablespaceName, tables },
        });

        await this.forEach(tables, async(tableHash, tableIndex) => {
          const {
            fields,
            indexes,
            name,
            ranges,
            replicas,
            triggers,
          } = await Contract.callMethod('getTable', tableHash);

          this.send({
            entity: 'tables',
            hash: tableHash,
            payload: {
              name, ranges, replicas, tablespaceHash,
              hash: tableHash,
              fields: fields.map((fieldHash) => `${tableHash}_${fieldHash}`),
              indexes: indexes.map((indexHash) => `${tableHash}_${indexHash}`),
              triggers: triggers.map((triggerHash) => `${tableHash}_${triggerHash}`),
            },
          });

          Progress.send({
            count: tables.length,
            current: (tableIndex + 1),
            id: 'sync',
            title: `Sync tablespace: «${tablespaceName}»`,
            subTitle: `Fetch table: «${name}»`,
            type: 'progress',
            value: progressPart * (index + 1) + progressPart / tables.length * tableIndex,
          });

          await this.forEach(fields, async(fieldHash, index) => {
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

            this.send({
              entity: 'fields',
              hash: `${tableHash}_${fieldHash}`,
              payload: fields[index],
            });
          });

          await this.forEach(indexes, async(indexHash, index) => {
            const {
              fields,
              iType: type,
              name,
            } = await Contract.callMethod('getIndex', tableHash, indexHash);

            indexes[index] = {
              fields, indexHash, name, tableHash, tablespaceHash, type,
              hash: `${tableHash}_${indexHash}`,
            };

            this.send({
              entity: 'indexes',
              hash: `${tableHash}_${indexHash}`,
              payload: indexes[index],
            });
          });

          await this.forEach(triggers, async(triggerHash, index) => {
            const { name, payload } = await Contract.callMethod('getTrigger', tableHash, triggerHash);

            triggers[index] = {
              name, payload, tableHash, tablespaceHash, triggerHash,
              hash: `${tableHash}_${triggerHash}`,
            };

            this.send({
              entity: 'triggers',
              hash: `${tableHash}_${triggerHash}`,
              payload: triggers[index],
            });
          });

          tables[tableIndex] = {
            tablespaceHash,
            hash: tableHash,
            name,
            fields, indexes, triggers,
            ranges, replicas,
          };
        });

        filteredTablespaces[index] = {
          hash: tablespaceHash,
          name: tablespaceName,
          tables,
        };
      });

      this.isFetching = false;
      this.schema = filteredTablespaces;

      Progress.send({
        count: 0,
        current: 0,
        id: 'sync',
        title: 'Sync completed!',
        subTitle: null,
        type: 'success',
      });

      this.send({ success: true });
    }

    return this.schema;
  }

  /**
   * @param {string} hash
   * @param {Object} payload
   */
  createTablespace(hash, payload) {
    const newSchema = [...this.schema, payload];
    this.schema = newSchema;
  }

  /**
   * @param {string} hash
   * @param {Object} payload
   */
  deleteTablespace(hash) {
    const newSchema = this.schema.filter(({ hash: itemHash }) => itemHash !== hash);
    this.schema = newSchema;
  }

  /**
   * @return {Object}
   */
  getSchema() {
    return this.schema;
  }

  getSocket() {
    return this.socket;
  }

  /**
   * @param {Object} data
   */
  send(data) {
    this.socket &&
    this.socket.readyState === this.socket.OPEN &&
    this.socket.send(JSON.stringify(data));
  }

  /**
   * @param {Object}
   */
  setSchema(newSchema) {
    this.schema = newSchema;
  }

  setSocket(socket) {
    this.socket = socket;
  }
}

module.exports = new Schema();
