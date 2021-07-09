const express = require('express');
const router = express.Router();
const categoryRoutes = require('./routes/categories');
const courseRoutes = require('./routes/courses');

router.get('/api/v1', function (req, res) {
  res.json({
    message: 'Hello from Online Academy Api v1'
  });
})

router.use('/api/v1/categories', categoryRoutes)
router.use('/api/v1/courses', courseRoutes)


module.exports = router;
