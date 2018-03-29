const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.user) {
    res.send(`Logged on as: ${req.session.user.username}`);
  } else {
    res.send('Not logged on');
  }
});

module.exports = router;
