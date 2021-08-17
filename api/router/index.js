const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');

router.get('/api/v1', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Api v1'
  });
})

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', userRoutes)
router.use('/api/v1/categories', categoryRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/lessons', lessonRoutes)

module.exports = router;
