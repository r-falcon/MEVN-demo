const {
  router,
  Abuy,
  Stock
} = require('../index')

const FL = {
  0: "蔬菜",
  1: "水果",
  2: "肉类",
  3: "水产",
  4: "干货",
}

router.get('/getBarChart', (req, res) => {
  Stock.find().then((stocks) => {
    var xData = []
    var yData = []
    stocks.map(item => {
      xData.push(FL[item.goodsSort])
      yData.push(item.goodsAmount)
    })
    Abuy.find().then(newabuys => {
      if (newabuys.length > 0) {
        Abuy.updateOne({
          _id: newabuys._id
        }, {
          xData: xData,
          yData: yData
        }).then(res => {
          // console.log(res, '执行，更新成功');
        })
      } else {
        new Abuy({
          title: '采购数量分类统计分析',
          xData: xData,
          yData: yData
        }).save()
      }
      res.sendResult(newabuys[0], 0, '获取成功')
    })
  })
})

module.exports = router