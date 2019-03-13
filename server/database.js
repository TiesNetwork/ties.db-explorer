const RxDB = require('rxdb');

// Connectn plugins
RxDB.plugin(require('pouchdb-adapter-node-websql'));
RxDB.plugin(require('pouchdb-adapter-http'));

// Schemas
const accountSchema = require('./models/accounts/schema');
const { schema: connectionSchema } = require('./models/connection');

const Database = {};
const SYNC_URL = 'http://localhost:3001';

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
