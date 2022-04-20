const {
  router,
  Purchase,
  Stock
} = require('../index')

/**
 * 获取采购列表
 */
router.get('/purchaseList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query, 'i')
  var _filter = {
    $or: [{
        PNo: {
          $regex: reg
        }
      },
      {
        goodsName: {
          $regex: reg
        }
      }
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

      stockAdd(req.body)
    }
  })
})

/**
 * 修改采购
 */
router.post('/editPurchase', (req, res) => {
  console.log(req.body);
  /**
   * collection.update({查询器},{修改器},true[存在即更新，否则插入],false[true批量更新，false只更新一条])
   */
  Purchase.updateOne({
    _id: req.body._id
  }, {
    goodsCompany: req.body.goodsCompany,
    goodsAddress: req.body.goodsAddress,
    goodsSort: req.body.goodsSort,
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

  Purchase.findOne({
    PNo: PNo
  }).then(purchases => {
    stockDelete(purchases)
  })

  Purchase.deleteOne({
    PNo: PNo
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

const stockAdd = function (data) {
  Stock.find({
    goodsName: data.goodsName
  }).then((stocks) => {
    if (stocks.length == 0) {
      new Stock({
        goodsName: data.goodsName,
        goodsPrice: data.goodsPrice,
        goodsAmount: data.goodsAmount
      }).save()
    } else {
      var flag = false
      for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].goodsPrice == data.goodsPrice) {
          let total = stocks[i].goodsAmount + data.goodsAmount

          Stock.updateOne({
            _id: stocks[i]._id
          }, {
            $set: {
              goodsAmount: total
            }
          }).then(res => {
            flag = true
            return
          })
        }
      }

      if (!flag) {
        new Stock({
          goodsName: data.goodsName,
          goodsPrice: data.goodsPrice,
          goodsAmount: data.goodsAmount
        }).save()
      }
    }
  })
}

const stockDelete = function (data) {
  Stock.findOne({
    goodsName: data.goodsName,
    goodsPrice: data.goodsPrice
  }).then(stocks => {
    Stock.updateOne({
      _id: stocks._id
    }, {
      goodsAmount: stocks.goodsAmount - data.goodsAmount
    }).then(res => {
      return
    })
  })
}

module.exports = router