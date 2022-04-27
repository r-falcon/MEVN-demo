const {
  router,
  Single
} = require('../index')

/**
 * 获取单文件列表
 */
router.get('/singleList', (req, res) => {
  Single.find().then((singles) => {
    res.sendResult(singles, 0, "获取成功")
  })
})

/**
 * 添加
 */
router.post('/singleAdd', (req, res) => {
  var fileList = req.body.fileList

  Single.find().then((singles) => {
    if (singles.length == 0) {
      new Single(req.body).save().then((newSingle) => {
        return res.sendResult(newSingle, 0, '添加成功')
      })
    } else {
      var flag = true
      singles && singles[0].singleList.map(item => {
        if (item.name == fileList.name) {
          flag = false
          return res.sendResult(null, 1, '请勿重复上传数据')
        }
      })

      if (flag) {
        Single.updateOne({
          _id: singles[0]._id
        }, {
          $push: {
            singleList: fileList
          }
        }).then((newSingle) => {
          return res.sendResult(newSingle, 0, '修改成功')
        })
      }
    }
  })
})

/**
 * 删除
 */
router.post('/singleDelete', (req, res) => {
  var id = req.body.id || ''
  var url = req.body.url || ''
  if (id == '' || url == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  Single.updateOne({
    _id: id
  }, {
    $pull: {
      singleList: {
        url: url
      }
    }
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

module.exports = router