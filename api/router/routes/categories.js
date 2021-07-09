const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model');

router.get('/', async function (req, res) {
  const list = await categoryModel.all();
  res.json(list);
})

module.exports = router;
