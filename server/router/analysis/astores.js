const {
  router,
  Astore,
  Stock
} = require('../index')

const FL = {
  0: "蔬菜",
  1: "水果",
  2: "肉类",
  3: "水产",
  4: "干货",
}

router.get('/getPieChart', (req, res) => {
  Stock.find().then((stocks) => {
    var legend = []
    var pieData = []

    stocks.map(item => {
      legend.push(FL[item.goodsSort])
      pieData.push({
        value: item.storeAmount,
        name: FL[item.goodsSort]
      })
    })

    Astore.find().then(newastore => {
      if (newastore.length > 0) {
        Astore.updateOne({
          _id: newastore._id
        }, {
          legend: legend,
          pieData: pieData
        }).then(res => {
          // console.log(res, '执行，更新成功');
        })
      } else {
        new Astore({
          title: '库存数量分类统计分析',
          legend: legend,
          pieData: pieData
        }).save()
      }
      res.sendResult(newastore[0], 0, '获取成功')
    })
  })
})

module.exports = router