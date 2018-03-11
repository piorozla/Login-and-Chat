require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('API online');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
