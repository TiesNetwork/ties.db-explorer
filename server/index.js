/* eslint-disable */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const expressWs = require('express-ws')(app);

// Routes
const accounts = require('./models/accounts/route');
const progress = require('./models/progress/route');
const fields = require('./models/fields/route');
const indexes = require('./models/indexes/route');
const schema = require('./models/schema/route');
const tables = require('./models/tables/route');
const tablespaces = require('./models/tablespaces');
const triggers = require('./models/triggers/route');
const transactions = require('./models/transactions/route');

// Views
const logger = require('./views/logger');
const connections = require('./views/connections');

app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err && req.xhr) {
    res.status(400).send({ error: err.message });
  }
});

app.use('/accounts', accounts);
app.use('/connections', connections);
app.use('/fields', fields);
app.use('/indexes', indexes);
app.use('/logger', logger);
app.use('/progress', progress);
app.use('/schema', schema);
app.use('/tables', tables);
app.use('/tablespaces', tablespaces);
app.use('/transactions', transactions);
app.use('/triggers', triggers);

module.exports = app;
