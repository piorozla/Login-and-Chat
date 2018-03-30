const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(200).send('Not logged on');
  }
});

module.exports = router;
