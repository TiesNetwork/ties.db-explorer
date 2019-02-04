/* eslint-disable */
const { set } = require('lodash');
const Schema = require('../schema/controller');

class Indexes {
  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {Object} payload
   */
  createIndex(tablespaceHash, tableHash, payload) {
    if (tableHash && tablespaceHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tablespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, indexes, ...table }) => ({
            ...table, hash,
            indexes: hash === tableHash
              ? [...indexes, payload]
              : indexes,
          }))
          : tables,
      }));

      Schema.setSchema(newSchema);
    }
  }

  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {string} indexHash
   */
  deleteIndex(tablespaceHash, tableHash, indexHash) {
    if (tablespaceHash && tableHash && indexHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tabpespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, indexes, ...table }) => ({
            ...table, hash,
            indexes: hash === tableHash
              ? indexes.filter(({ hash }) => hash !== indexHash)
              : indexes,
          }))
          : tables
      }));

      Schema.setSchema(newSchema);
    }
  }
}

module.exports = new Indexes();
