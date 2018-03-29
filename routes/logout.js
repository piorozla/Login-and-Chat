const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('no get route for logout');
});

router.post('/', (req, res) => {
  req.session.destroy(() => {
    res.send(200);
  });
});

module.exports = router;
