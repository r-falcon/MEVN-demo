const multer = require('multer')
const fs = require('fs')
const md5 = require('md5')
const {
  router
} = require('./index')

// 图片大小限制
const SIZELIMIT = 500000

const storage = multer.diskStorage({
  // 指定文件路径
  destination: function (req, file, cb) {
    // cb(null, dir)
    cb(null, 'public/')
  },
  // 指定文件名 
  filename: function (req, file, cb) {
    cb(null, md5(Date.now() + file.originalname) + file.originalname.substring(file.originalname.lastIndexOf("."))) //对当前时间戳，加文件名取md5，加后缀名
  }
})

var createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

var uploadFolder = './public/'
createFolder(uploadFolder)

const upload = multer({
  storage: storage
})

router.post('/', upload.single('file'), (req, res) => {
  if (req.file === undefined) {
    return res.sendResult(null, 1, 'no file')
  }
  // const {
  //   size,
  //   mimetype,
  //   filename
  // } = req.file
  // const types = ['jpg', 'jpeg', 'png', 'gif']
  // const tmpType = mimetype.split('/')[1]
  // if (size >= SIZELIMIT) {
  //   // 检查大小
  //   return res.sendResult(null, 1, 'file so large')
  // } else if (types.indexOf(tmpType) < 0) {
  //   // 检查文件类型
  //   return res.sendResult(null, 1, 'not accepted filetype')
  // }
  res.sendResult(req.file, 0, '上传成功')
})

module.exports = router