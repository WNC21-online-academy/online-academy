const express = require('express');
const router = express.Router();
const ratingModel = require('../../models/rating.model');
const courseModel = require('../../models/course.model');
const authMdw = require('../../middlewares/auth.mdw')

router.get('/belong-to/:courseId', authMdw, async function (req, res) {
  const { courseId } = req.params;
  const { offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await ratingModel.listByCourse(courseId, orderBy, +offset, +limit);
  res.json({ count, list });
})

// Add 
router.post('/', authMdw, async function (req, res) {
  try {
    const { userId: id_student } = req.accessTokenPayload;
    const result = await ratingModel.add({ ...req.body, id_student });
    res.status(200).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

module.exports = router;
