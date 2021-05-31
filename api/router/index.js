const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

router.get('/api/v1', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Api v1'
  });
})


router.get('/api/v1/users', async function (req, res) {
  const list = await userModel.all();
  res.json(list);
})

module.exports = router;
