/* eslint-disable */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const expressWs = require('express-ws')(app);

// Routes
const accounts = require('./models/accounts/route');
const progress = require('./models/progress/route');
const connections = require('./models/connections/route');
const schema = require('./models/schema/route');
const tablespaces = require('./models/tablespaces');
const transactions = require('./models/transactions/route');

app.use(cors());
app.use(bodyParser.json());
// app.use((err, req, res, next) => {
//   if (err && req.xhr) {
//     res.status(400).send({ error: err.message });
//   }
// });

app.use('/accounts', accounts);
app.use('/connections', connections);
app.use('/progress', progress);
app.use('/schema', schema);
app.use('/tablespaces', tablespaces);
app.use('/transactions', transactions);

app.listen(3001);
