const express = require('express');
const router = express.Router();
const validateMdw = require('../../middlewares/validate.mdw');
const coursesSchema = require('../../schema/courses/addOrUpdate.json');
const { uploadImages } = require('../../middlewares/file-upload.mdw')
const courseModel = require('../../models/course.model');
const categoryModel = require('../../models/category.model');
const watchlistModel = require('../../models/watchlist.model');
const courseDetailModel = require('../../models/course_detail.model');
const authMdw = require('../../middlewares/auth.mdw')
const pathPrefix = '/assets/images/';

// Fetch top
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

// Search
router.get('/search', async function (req, res) {
  const { keyword, category, order_by, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  switch (order_by) {
    case 'rate_desc':
      orderBy.unshift({
        column: 'rating',
        order: 'desc'
      });
      break;
    case 'rate_asc':
      orderBy.unshift({
        column: 'rating',
        order: 'asc'
      });
      break;
    case 'tutition_desc':
      orderBy.unshift({
        column: 'tutition',
        order: 'desc'
      });
      break;
    case 'tutition_asc':
      orderBy.unshift({
        column: 'tutition',
        order: 'asc'
      });
      break;
  }
  const { count, list } = await courseModel.search(keyword, +category, orderBy, +offset, +limit);
  res.json({ count, list });
})

// fetch watchlist
router.get('/watchlist', authMdw, async function (req, res) {
  const { userId } = req.accessTokenPayload;
  const { offset, limit } = req.query;
  let orderBy = [{
    column: 'watchlists.updated_at',
    order: 'desc'
  }];
  const { count, list } = await courseModel.listByWatchlist(null, userId, orderBy, +offset, +limit);
  res.json({ count, list });
})

// Add to wachlist
router.post('/:id/watchlist', authMdw, async function (req, res) {
  try {
    const { id: id_course } = req.params;
    const { userId: id_user } = req.accessTokenPayload;

    const result = await watchlistModel.add({ id_user, id_course });
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Remove watchlist 
router.delete('/:id/watchlist', authMdw, async function (req, res) {
  const { id } = req.params;
  const { userId } = req.accessTokenPayload;
  try {
    const result = await watchlistModel.delete(userId, id);
    res.status(200).json(result ? { id_course: id, id_user: userId } : null);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Fetch courses joined
router.get('/joined', authMdw, async function (req, res) {
  const { userId } = req.accessTokenPayload;
  const { offset, limit } = req.query;
  let orderBy = [{
    column: 'course_details.updated_at',
    order: 'desc'
  }];
  const { count, list } = await courseModel.listByStudent(null, userId, orderBy, +offset, +limit);
  res.json({ count, list });
})

// Join course
router.post('/:id/join', authMdw, async function (req, res) {
  try {
    const { id: id_course } = req.params;
    const { userId: id_user } = req.accessTokenPayload;

    const result = await courseDetailModel.add({ id_user, id_course });
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// fetch by teacher
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

// Fetch all
router.get('/', async function (req, res) {
  const { is_suspended, keyword, offset, limit } = req.query;
  const showSuspended = is_suspended === 'true'
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await courseModel.search(keyword, null, orderBy, +offset, +limit, showSuspended);
  res.json({ count, list });
})

// Fetch by id
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const { userId } = req.query;
  const result = await courseModel.single(id);
  if (userId > 0) {
    result.in_watchlist = !!(await watchlistModel.single(userId, id));
    result.is_joined = !!(await courseDetailModel.single(userId, id));
  }
  let view_count
  if (result.id > 0) {
    view_count = result.view_count + 1
    await courseModel.update(result.id, { view_count })
  }
  res.status(200).json({ ...result, view_count });
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
