const {
  router,
  Purchase
} = require('../index')

/**
 * 获取采购列表
 */
router.get('/purchaseList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query,'i')
  var _filter = {
    $or:[
      {PNo: {$regex: reg}},
      {goodsName: {$regex: reg}}
    ]
  }

  Purchase.count(_filter).then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Purchase.find(_filter)
      .limit(limit)
      .skip(skip)
      .then((purchases) => {
        res.sendResult({
          records: purchases,
          total: count
        }, 0, '获取成功')
      })
  })
})

/**
 * 添加采购
 */
router.post('/addPurchase', (req, res) => {
  var PNo = req.body.PNo || ''
  Purchase.findOne({
    PNo: PNo
  }).then((purchase) => {
    if (purchase) {
      return res.sendResult(null, 1, "已录入该条采购记录")
    } else {
      new Purchase(req.body).save().then(newPurchase => {
        return res.sendResult(newPurchase, 0, '添加成功')
      })
    }
  })
})

/**
 * 修改采购
 */
router.post('/editPurchase', (req, res) => {
  /**
   * collection.update({查询器},{修改器},true[存在即更新，否则插入],false[true批量更新，false只更新一条])
   */
  Purchase.updateOne({
    _id: req.body._id
  }, {
    goodsName: req.body.goodsName,
    goodsCompany: req.body.goodsCompany,
    goodsAddress: req.body.goodsAddress,
    goodsSort: req.body.goodsSort,
    goodsPrice: req.body.goodsPrice,
    goodsAmount: req.body.goodsAmount,
    isPay: req.body.isPay,
    isTrans: req.body.isTrans,
  }).then(newPurchase => {
    res.sendResult(newPurchase, 0, '修改成功')
  })
})

/**
 * 删除采购
 */
 router.get('/deletePurchase', (req, res) => {
  var PNo = req.query.PNo || ''
  if (PNo == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  Purchase.deleteOne({
    PNo:PNo
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

module.exports = router