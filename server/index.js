/* eslint-disable */
const cors = require('cors');
const express = require('express');

const app = express();

const expressWs = require('express-ws')(app);

// Routes
const connections = require('./models/connections/route');
const schema = require('./models/schema/route');

app.use(cors());

app.use('/connections', connections);
app.use('/schema', schema);

app.ws('/', (ws, req) => {
  ws.on('message', (message) => {
    // console.log(message);
  });
});

app.listen(3001);
