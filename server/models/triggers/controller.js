/* eslint-disable */
const { set } = require('lodash');
const Schema = require('../schema/controller');

class Triggers {
  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {Object} payload
   */
  createTrigger(tablespaceHash, tableHash, payload) {
    if (tableHash && tablespaceHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tablespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, triggers, ...table }) => ({
            ...table, hash,
            triggers: hash === tableHash
              ? [...triggers, payload]
              : triggers,
          }))
          : tables,
      }));

      Schema.setSchema(newSchema);
    }
  }

  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {string} triggerHash
   */
  deleteTrigger(tablespaceHash, tableHash, triggerHash) {
    if (tablespaceHash && tableHash && triggerHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tablespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, triggers, ...table }) => ({
            ...table, hash,
            triggers: hash === tableHash
              ? triggers.filter(({ hash }) => hash !== triggerHash)
              : triggers,
          }))
          : tables
      }));

      Schema.setSchema(newSchema);
    }
  }
}

module.exports = new Triggers();
