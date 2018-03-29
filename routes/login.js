const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('no get route for login');
});

router.post('/', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  if (email && password) {
    User.findByCredentials(email, password)
      .then(user => {
        req.session.regenerate(err => {
          if (err) {
            console.log('error regenerate:', err);
          }
          req.session.user = user;
          res.status(200).send(user);
        });
      })
      .catch(() => {
        res.status(400).send('User not found or wrong data');
      });
  } else {
    res.status(400).send('Form data missing');
  }
});

module.exports = router;
