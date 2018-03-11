require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('API online');
});

app.post('/signup', (req, res) => {
  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    });

    user
      .save()
      .then(savedUser => {
        res.status(200).send(savedUser);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  } else {
    res.status(400).send('Form data invalid');
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
