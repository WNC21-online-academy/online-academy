const express = require('express');
const router = express.Router();
const categoryModel = require('../../models/category.model');
const validateMdw = require('../../middlewares/validate.mdw');
const categoriesSchema = require('../../schema/categories/addOrUpdate.json');
const authMdw = require('../../middlewares/auth.mdw');

// List all
router.get('/', async function (req, res) {
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await categoryModel.search(keyword, orderBy, +offset || null, +limit || null);
  res.status(200).json({ count, list });
})

// Add 
router.post('/', authMdw, validateMdw(categoriesSchema), async function (req, res) {
  try {
    const category = await categoryModel.add(req.body);
    if (category) {
      const { id_parent } = category
      if (id_parent) {
        const parent = await categoryModel.name(id_parent);
        category.name_parent = parent.name;
      }
    }
    res.status(200).json(category);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Update 
router.put('/:id', authMdw, validateMdw(categoriesSchema), async function (req, res) {
  try {
    const { id } = req.params;
    const category = await categoryModel.update(id, req.body);
    if (category) {
      const { id_parent } = category
      if (id_parent) {
        const parent = await categoryModel.name(id_parent);
        category.name_parent = parent.name;
      }
    }
    res.status(200).json(category);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Delete 
router.delete('/:id', authMdw, async function (req, res) {
  const { id } = req.params;
  try {
    const result = await categoryModel.delete(id);
    res.status(200).json(result ? id : 0);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

module.exports = router;
