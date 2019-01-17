/* eslint-disable */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

const expressWs = require('express-ws')(app);

// Routes
const progress = require('./models/progress/route');
const connections = require('./models/connections/route');
const schema = require('./models/schema/route');
const tablespaces = require('./models/tablespaces');
const transactions = require('./models/transactions');

app.use(cors());
app.use(bodyParser.json());

app.use('/connections', connections);
app.use('/progress', progress);
app.use('/schema', schema);
app.use('/tablespaces', tablespaces);
app.use('/transactions', transactions);

app.ws('/', (ws, req) => {
  ws.on('message', (message) => {
    // console.log(message);
  });
});

app.listen(3001);
