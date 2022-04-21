const {
  router,
  Stock,
  Order
} = require('../index')

/**
 * 获取订单列表
 */
router.get('/orderList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query, 'i')
  var _filter = {
    $or: [{
        ONo: {
          $regex: reg
        }
      },
      {
        goodsName: {
          $regex: reg
        }
      },
      {
        buyer: {
          $regex: reg
        }
      }
    ]
  }

  Order.count(_filter).then(count => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Order.find(_filter)
      .limit(limit)
      .skip(skip)
      .then((orders) => {
        res.sendResult({
          records: orders,
          total: count
        }, 0, '获取成功')
      })
  })
})

/**
 * 添加订单
 */
router.post('/addOrder', (req, res) => {
  var ONo = req.body.ONo || ''
  Order.findOne({
    ONo: ONo
  }).then((orders) => {
    if (orders) {
      return res.sendResult(null, 1, "已录入该条订单信息")
    } else {
      new Order(req.body).save().then(newOrder => {
        return res.sendResult(newOrder, 0, "添加成功")
      })

      orderAdd(req.body)
    }
  })
})

/**
 * 修改订单
 */
router.post('/editOrder', (req, res) => {
  console.log(req.body);
  /**
   * collection.update({查询器},{修改器},true[存在即更新，否则插入],false[true批量更新，false只更新一条])
   */
  Order.updateOne({
    _id: req.body._id
  }, {
    buyer: req.body.buyer,
    buyerAddress: req.body.buyerAddress,
    buyerPhone: req.body.buyerPhone,
    isPay: req.body.isPay,
    isTrans: req.body.isTrans,
  }).then(newPurchase => {
    res.sendResult(newPurchase, 0, '修改成功')
  })
})

/**
 * 删除订单
 */
router.get('/deleteOrder', (req, res) => {
  var ONo = req.query.ONo || ''
  if (ONo == '') {
    res.sendResult(null, 1, "请传输必要的参数")
  }

  Order.findOne({
    ONo: ONo
  }).then(orders => {
    orderDelete(orders)
  })

  Order.deleteOne({
    ONo: ONo
  }).then(() => {
    res.sendResult(null, 0, "删除成功")
  })
})

const orderAdd = function (data) {
  Stock.findOne({
    goodsName: data.goodsName,
    goodsPrice: data.goodsPrice
  }).then(stocks => {
    Stock.updateOne({
      _id: stocks._id
    }, {
      saleAmount: stocks.saleAmount + data.buyAmount,
      storeAmount: stocks.storeAmount - data.buyAmount
    }).then(res => {
      return
    })
  })
}

const orderDelete = function (data) {
  Stock.findOne({
    goodsName: data.goodsName,
    goodsPrice: data.goodsPrice
  }).then(stocks => {
    Stock.updateOne({
      _id: stocks._id
    }, {
      saleAmount: stocks.saleAmount - data.buyAmount,
      storeAmount: stocks.storeAmount + data.buyAmount
    }).then(res => {
      return
    })
  })
}

module.exports = router