/* eslint-disable */
const { set } = require('lodash');
const Schema = require('../schema/controller');

class Fields {
  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {Object} payload
   */
  createField(tablespaceHash, tableHash, payload) {
    if (tableHash && tablespaceHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tablespace }) => ({
        ...tablespace, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, fields, ...table }) => ({
            ...table, hash,
            fields: hash === tableHash
              ? [...fields, payload]
              : fields,
          }))
          : tables,
      }));

      Schema.setSchema(newSchema);
    }
  }

  /**
   * @param {string} tablespaceHash
   * @param {string} tableHash
   * @param {string} fieldHash
   */
  deleteField(tablespaceHash, tableHash, fieldHash) {
    if (tablespaceHash && tableHash && fieldHash) {
      const schema = Schema.getSchema();
      const newSchema = schema.map(({ hash, tables, ...tabpespace }) => ({
        ...tablespaceHash, hash,
        tables: hash === tablespaceHash
          ? tables.map(({ hash, fields, ...table }) => ({
            ...table, hash,
            fields: hash === tableHash
              ? fields.filter(({ hash }) => hash !== fieldHash)
              : fields,
          }))
          : tables
      }));

      Schema.setSchema(newSchema);
    }
  }
}

module.exports = new Fields();
