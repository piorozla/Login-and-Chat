require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

// routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const testSession = require('./routes/testSession');

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
app.use('/testSession', testSession);

// app.get('/testSession2', (req, res) => {
//   req.session.user = 2;
//   res.status(200).send('API online');
// });
// app.get('/testSession3', (req, res) => {
//   req.session.user = 3;
//   res.status(200).send('API online 2');
// });

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
