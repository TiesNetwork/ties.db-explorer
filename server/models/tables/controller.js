/* eslint-disable */
const { set } = require('lodash');
const Schema = require('../schema/controller');

class Tables {
  /**
   * @param {string} tablespaceHash
   * @param {Object} payload
   */
  createTable(tablespaceHash, payload) {
    if (tablespaceHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tablespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? [...tables, payload]
          : tables,
      }));

      Schema.setSchema(newSchema);
    }
  }

  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   */
  deleteTable(tablespaceHash, tableHash) {
    if (tablespaceHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tabpespace }) => ({
        ...tablespaceHash, hash,
        tables: hash === tablespaceHash
          ? tables.filter(({ hash }) => hash !== tableHash)
          : tables
      }));

      Schema.setSchema(newSchema);
    }
  }
}

module.exports = new Tables();
