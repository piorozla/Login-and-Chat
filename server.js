require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

// routes
const signup = require('./routes/signup');

/* eslint-disable no-unused-vars */
const { mongoose } = require('./db/mongoose');
/* eslint-enable no-unused-vars */


const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).send('API online');
});


app.use('/signup', signup);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
