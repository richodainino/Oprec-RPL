const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Settings Page');
});

router.get('/profile', (req, res) => {
  res.send('Profile Page');
});

module.exports = router;