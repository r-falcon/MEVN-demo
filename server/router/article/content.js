const {
  router,
  Content
} = require('../index')

/**
 * 获取内容列表
 */
router.get('contentList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query, 'i')
  var _filter = {
    $or: [{
        category: {
          $regex: reg
        }
      },
      {
        user: {
          $regex: reg
        }
      }
    ]
  }

  Content.count(_filter).then(count => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Content.find(_filter).limit(limit).skip(skip).then((contents) => {
      res.sendResult({
        records: contents
      }, 0, "获取成功")
    })
  })
})

module.exports = router