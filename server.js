require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

// routes
const signup = require('./routes/signup');
const login = require('./routes/login');

/* eslint-disable no-unused-vars */
const { mongoose } = require('./db/mongoose');
/* eslint-enable no-unused-vars */
const sessionManagementConfig = require('./config/sessionManagementConfig');


const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());

sessionManagementConfig(app);

// routes
app.use('/signup', signup);
app.use('/login', login);

app.get('/', (req, res) => {
  res.status(200).send('API online');
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
