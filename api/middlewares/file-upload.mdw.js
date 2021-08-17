const path = require('path')
const multer = require('multer')

const imageStorage = multer.diskStorage({
  destination: 'assets/uploads/images',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  }
});

const videoStorage = multer.diskStorage({
  destination: 'assets/uploads/videos',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  }
})

module.exports = {
  uploadImages: multer({
    storage: imageStorage,
    limits: {
      fileSize: 10 * 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|gif)$/)) {
        return cb(new Error('Please upload a Image'))
      }
      cb(undefined, true)
    }
  }),
  uploadVideos: multer({
    storage: videoStorage,
    limits: {
      fileSize: 100 * 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
        return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
    }
  })
}