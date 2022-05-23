const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
// 引入数据库连接
require('./db/connect')
const path = require('path')
const app = express()
// 导入nodejs-websocket模块
const ws = require('nodejs-websocket')

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

// 执行websocket处理连接方法
var server = ws.createServer(function (connection) {
  // 处理客户端发送过来的消息
  connection.on('text', function (data) {
    console.log('接受到客户端消息：', data);
    let jsonStr = JSON.stringify({ name: 'falcon', age: 20, sex: '女', height: 162 })
    // 发送消息给客户端
    connection.send(jsonStr)
  })

  // 监听关闭
  connection.on('close', function (code, reason) {
    console.log('connection closed');
  })

  // 监听异常
  connection.on('error', () => {
    console.log('服务异常关闭...');
  })
})

server.listen(8001, (err) => {
  if (err) {
    console.log('websocket connect error');
  } else {
    console.log('websocket connected');
  }
})


app.listen(8080, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功')
  }
})