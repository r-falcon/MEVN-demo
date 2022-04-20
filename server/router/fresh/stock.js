const {
  router,
  Stock,
  Purchase
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

  Purchase.count(_filter).then(count => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Purchase.find(_filter).limit(limit).skip(skip)
      .then((purchases) => {
        console.log(count);
        console.log(purchases);
        for(let i=0;i<purchases.length;i++){
          for(let j=i+1;j<purchases.length;j++){
            if(purchases[i].goodsName == purchases[j].goodsName && purchases[i].goodsPrice == purchases[j].goodsPrice){
              purchases[i].goodsAmount = purchases[i].goodsAmount + purchases[j].goodsAmount
              purchases.splice(j,1)
              count--
            }
          }
        }
        res.sendResult({records:purchases,total:count},0,"获取成功")
      })
  })
})

module.exports = router