/* eslint-disable */
const cors = require('cors');
const express = require('express');

const app = express();

// Routes
const connections = require('./models/connections/route');
const schema = require('./models/schema/route');

app.use(cors());

app.use('/connections', connections);
app.use('/schema', schema);

app.listen(3001);
