require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

// routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const sessionInfo = require('./routes/sessionInfo');

/* eslint-disable no-unused-vars */
const { mongoose } = require('./db/mongoose');
/* eslint-enable no-unused-vars */
const sessionManagementConfig = require('./config/sessionManagementConfig');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());

sessionManagementConfig(app);

// Allow access for all origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sessionInfo', sessionInfo);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
