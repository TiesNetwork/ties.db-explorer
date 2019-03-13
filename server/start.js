/* eslint-disable */
const { fork } = require('child_process');

// Models
const Logger = require('./models/logger');

const Database = require('./database');
const server = require('./index.js');

(async () => {
  Logger.info('Starting the helper...');

  await Database.get();
  server.listen(3001, () =>
    Logger.success('Helper is started at http://localhost:3001'));
})();

