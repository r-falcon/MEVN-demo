const {
  router,
  Stock
} = require('../index')

/**
 * 获取库存列表
 */
router.get('/stockList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''

  var reg = new RegExp(query, 'i')
  var _filter = {
    goodsName: {
      $regex: reg
    }
  }

  Stock.count(_filter).then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Stock.find(_filter)
      .limit(limit)
      .skip(skip)
      .then((stocks) => {
        res.sendResult({
          records: stocks,
          total: count
        }, 0, '获取成功')
      })
  })
})

module.exports = router