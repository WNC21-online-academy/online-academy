const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const courseRoutes = require('./routes/courses');

router.get('/api/v1', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Api v1'
  });
})

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/categories', categoryRoutes)
router.use('/api/v1/courses', courseRoutes)

// Test api
const ratingModel = require('../models/rating.model.js');
router.get('/test', (req, res) => {
  const rating = req.query
  ratingModel.add(rating)
  res.send('oki')
})
// 


module.exports = router;
