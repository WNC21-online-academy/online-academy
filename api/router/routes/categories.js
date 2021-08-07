const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model');
const authMdw = require('../../middlewares/auth.mdw')

router.get('/', async function (req, res) {
  const list = await categoryModel.all();
  res.status(200).json(list);
})

module.exports = router;
