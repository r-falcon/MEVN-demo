const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
// 引入数据库连接
require('./db/connect')
const path = require('path')
const app = express()

// CORS设置跨域访问
app.all('*', (req, res, next) => {
  // 第一种
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', '*')

  // 第二种
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  // res.setHeader('Content-Type', 'application/json;charset=utf-8')
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  // )
  // res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  // res.header('X-Powered-By', ' 3.2.1')
  next()
})

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// cookieParser
app.use(cookieParser())

// 统一返回响应机制
var resForm = require('./modules/resForm')
app.use(resForm)

// passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// 创建api
const api = require('./router/api')
app.use('/api', api)
const system = require('./router/system')
app.use('/system', system)
const purchase = require('./router/fresh/purchase')
app.use('/purchase', purchase)
const stock = require('./router/fresh/stock')
app.use('/stock', stock)
const order = require('./router/fresh/order')
app.use('/order', order)
const abuy = require('./router/analysis/abuys')
app.use('/abuy', abuy)
const astore = require('./router/analysis/astores')
app.use('/astore', astore)
const atrans = require('./router/analysis/atrans')
app.use('/atrans', atrans)
const category = require('./router/article/category')
app.use('/catetory', category)
const content = require('./router/article/content')
app.use('/content', content)
const upload = require('./router/upload')
app.use('/upload', upload)
const single = require('./router/upload/single')
app.use('/single', single)
const multiple = require('./router/upload/multiple')
app.use('/multiple', multiple)

// 设置静态目录
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8080, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功')
  }
})