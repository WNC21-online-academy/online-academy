const express = require('express');
const router = express.Router();
const courseModel = require('../../models/course.model');

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
router.get('/top/enroll', async function (req, res) {
  const list = await courseModel.listTopEnroll(0, 10);
  res.json(list);
})
router.get('/top/related', async function (req, res) {
  const { courseId, offset, limit } = req.query;
  const list = await courseModel.listTopRelated(courseId, offset, limit);
  res.json(list);
})
router.get('/', async function (req, res) {
  const { keyword, categoryId, offset, limit } = req.query;
  const list = await courseModel.listAll(keyword, categoryId, offset, limit);
  res.json(list);
})

module.exports = router;
