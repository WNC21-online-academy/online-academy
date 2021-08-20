const express = require('express');
const router = express.Router();
const validateMdw = require('../../middlewares/validate.mdw');
const lessonsSchema = require('../../schema/lessons/addOrUpdate.json');
const { uploadVideos } = require('../../middlewares/file-upload.mdw')
const lessonModel = require('../../models/lesson.model');
const courseModel = require('../../models/course.model');
const authMdw = require('../../middlewares/auth.mdw')
const videoPrefix = '/assets/videos/';

router.get('/:id', authMdw, async function (req, res) {
  const { id } = req.params;
  const course = await lessonModel.single(+id);
  res.json(course);
})

router.get('/belong-to/:courseId', authMdw, async function (req, res) {
  const { courseId } = req.params;
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'sort_order',
    order: 'desc'
  }];
  const { count, list } = await lessonModel.listByCourse(keyword, courseId, orderBy, +offset, +limit);
  res.json({ count, list });
})

// Add 
router.post('/', authMdw, validateMdw(lessonsSchema), async function (req, res) {
  try {
    const result = await lessonModel.add(req.body);
    if (result) {
      const { id_course } = result
      if (id_course) {
        const obj = await courseModel.name(id_course);
        result.name_course = obj.name;
      }
    }
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Upload video 
router.put('/:id/video', authMdw, uploadVideos.single('video'), async function (req, res) {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'File error' });
    }
    const video = `${videoPrefix}${file.filename}`;
    const result = await lessonModel.update(id, { video });
    res.status(200).json({ video: result.video });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Update 
router.put('/:id', authMdw, validateMdw(lessonsSchema), async function (req, res) {
  try {
    const { id } = req.params;
    const result = await lessonModel.update(id, req.body);
    if (result) {
      const { id_course } = result
      if (id_course) {
        const obj = await courseModel.name(id_course);
        result.name_course = obj.name;
      }
    }
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

module.exports = router;
