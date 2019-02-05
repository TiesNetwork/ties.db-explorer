const RxDB = require('rxdb');

// Connectn plugins
RxDB.plugin(require('pouchdb-adapter-node-websql'));
RxDB.plugin(require('pouchdb-adapter-http'));

// Schemas
const accountSchema = require('./models/accounts/schema');

const Database = {};
const SYNC_URL = 'http://localhost:3001';

const connectionSchema = {
  description: '',
  title: 'Connection schema',
  type: 'object',
  version: 0,
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    url: { type: 'string' },
    ws: { type: 'string' },
  },
  required: ['name', 'url'],
};

const create = async (name) => {
  const database = await RxDB.create({
    name: name || 'tiesdb',
    adapter: 'websql',
    password: 'myLongAndStupidPassword',
    multiInstance: false,
  });

  await database.collection({
    name: 'accounts',
    schema: accountSchema,
  });

  await database.collection({
    name: 'connections',
    schema: connectionSchema,
  });

  database.collections.accounts.sync({
    remote: `${SYNC_URL}/accounts`,
  });

  database.collections.connections.sync({
    remote: `${SYNC_URL}/connections`,
  });

  return database;
};

let createPromise = null;

Database.get = async (name) => {
  if (!createPromise) {
    createPromise = await create(name);
  }

  return createPromise;
};

module.exports = Database;
