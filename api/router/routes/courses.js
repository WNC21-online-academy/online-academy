const express = require('express');
const router = express.Router();
const { uploadImages } = require('../../middlewares/file-upload.mdw')
const courseModel = require('../../models/course.model');
const categoryModel = require('../../models/category.model');
const authMdw = require('../../middlewares/auth.mdw')
const pathPrefix = '/assets/images/';

router.get('/top/hot', async function (req, res) {
  const list = await courseModel.listTopHot(0, 4);
  res.json(list);
})
router.get('/top/view', async function (req, res) {
  const list = await courseModel.listTopView(0, 10);
  res.json(list);
})
router.get('/top/new', async function (req, res) {
  const list = await courseModel.listTopNew(0, 10);
  res.json(list);
})
router.get('/top/week', async function (req, res) {
  const list = await courseModel.listTopEnroll(0, 10);
  res.json(list);
})
router.get('/top/related', async function (req, res) {
  const { courseId, offset, limit } = req.query;
  const list = await courseModel.listTopRelated(courseId, offset, limit);
  res.json(list);
})

router.get('/search', async function (req, res) {
  const { keyword, category, order_by, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  switch (order_by) {
    case 'rate_desc':
      orderBy.push({
        column: 'rating',
        order: 'desc'
      });
      break;
    case 'rate_asc':
      orderBy.push({
        column: 'rating',
        order: 'asc'
      });
      break;
    case 'tutition_desc':
      orderBy.push({
        column: 'tutition',
        order: 'desc'
      });
      break;
    case 'tutition_asc':
      orderBy.push({
        column: 'tutition',
        order: 'asc'
      });
      break;
  }
  const { count, list } = await courseModel.search(keyword, +category, orderBy, +offset, +limit);
  res.json({ count, list });
})

router.get('/by-creator', authMdw, async function (req, res) {
  const { userId } = req.accessTokenPayload;
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await courseModel.listByCreator(keyword, userId, orderBy, +offset, +limit);
  res.json({ count, list });
})

router.get('/', async function (req, res) {
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await courseModel.search(keyword, null, orderBy, +offset, +limit);
  res.json({ count, list });
})

router.get('/:id', authMdw, async function (req, res) {
  const { id } = req.params;
  const course = await courseModel.single(+id);
  res.json(course);
})

// Add 
router.post('/', authMdw, uploadImages.single('thumbnail'), async function (req, res) {
  try {
    const { userId } = req.accessTokenPayload;
    const data = {
      ...req.body,
      id_created_by: req.body.id_created_by || userId
    }
    const file = req.file;
    if (file) {
      data.thumbnail = `${pathPrefix}${file.filename}`;
    }
    const result = await courseModel.add(data);

    if (result) {
      const { id_category } = result
      if (id_category) {
        const obj = await categoryModel.name(id_category);
        result.name_category = obj.name;
      }
    }
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Update 
router.put('/:id', authMdw, uploadImages.single('thumbnail'), async function (req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.accessTokenPayload;
    const data = {
      ...req.body,
      id_created_by: req.body.id_created_by || userId
    }
    const file = req.file;
    if (file) {
      data.thumbnail = `${pathPrefix}${file.filename}`;
    }
    const result = await courseModel.update(id, data);
    if (result) {
      const { id_category } = result
      if (id_category) {
        const obj = await categoryModel.name(id_category);
        result.name_category = obj.name;
      }
    }
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

module.exports = router;
