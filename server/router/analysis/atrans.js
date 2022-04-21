const {
  router,
  ATrans,
  Stock
} = require('../index')

const FL = {
  0: "蔬菜",
  1: "水果",
  2: "肉类",
  3: "水产",
  4: "干货",
}

router.get('/getLineChart', (req, res) => {
  Stock.find().then((stocks) => {
    var xData = []
    var yData = []
    stocks.map(item => {
      xData.push(FL[item.goodsSort])
      yData.push(item.saleAmount)
    })
    ATrans.find().then(newatrans => {
      if (newatrans.length > 0) {
        ATrans.updateOne({
          _id: newatrans._id
        }, {
          xData: xData,
          yData: yData
        }).then(res => {
          // console.log(res, '执行，更新成功');
        })
      } else {
        new ATrans({
          title: '销售数量分类统计分析',
          xData: xData,
          yData: yData
        }).save()
      }
      res.sendResult(newatrans[0], 0, '获取成功')
    })
  })
})

module.exports = router