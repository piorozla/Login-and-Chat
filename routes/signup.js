const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('no get route for signup');
});

router.post('/', (req, res) => {
  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    if (req.body.password.length < 6) {
      res.status(400).send('Password needs minimum 6 characters');
    } else if (req.body.password === req.body.passwordConf) {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
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
      res.status(400).send("Passwords don't match");
    }
  } else {
    res.status(400).send('Form data missing');
  }
});

module.exports = router;
