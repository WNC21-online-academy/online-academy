const express = require('express');
const router = express.Router();
const courseModel = require('../../models/course.model');
const authMdw = require('../../middlewares/auth.mdw')

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
router.get('/', async function (req, res) {
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
  const { count, courses } = await courseModel.search(keyword, +category, orderBy, +offset, +limit);
  res.json({ count, courses });
})
router.get('/:id', authMdw, async function (req, res) {
  const { id } = req.params;
  const course = await courseModel.single(+id);
  res.json(course);
})

module.exports = router;
