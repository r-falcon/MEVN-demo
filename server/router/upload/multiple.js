const {
  router,
  Multiple
} = require('../index')

/**
 * 获取单文件列表
 */
router.get('/multipleList', (req, res) => {
  Multiple.find().then((multiples) => {
    res.sendResult(multiples, 0, "获取成功")
  })
})

/**
 * 添加
 */
router.post('/multipleAdd', (req, res) => {
  var fileList = req.body.fileList
  Multiple.find().then((multiples) => {
    if (multiples.length == 0) {
      new Multiple().save().then((newMultiple) => {
        Multiple.updateOne({
          _id: newMultiple[0]._id
        }, {
          $push: {
            multipleList: {
              $each: fileList
            }
          }
        }).then((newMultiples) => {
          return res.sendResult(newMultiples, 0, '添加成功')
        })
      })
    } else {
      Multiple.updateOne({
        _id: multiples[0]._id
      }, {
        $push: {
          multipleList: {
            $each: fileList
          }
        }
      }).then((newMultiple) => {
        return res.sendResult(newMultiple, 0, '修改成功')
      })
    }
  })
})

/**
 * 删除
 */
router.post('/multipleDelete', (req, res) => {
  var id = req.body.id || ''
  var url = req.body.url || ''
  if (id == '' || url == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  Multiple.updateOne({
    _id: id
  }, {
    $pull: {
      multipleList: {
        url: url
      }
    }
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

module.exports = router