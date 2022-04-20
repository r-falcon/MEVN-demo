const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
// 引入数据库连接
require('./db/connect')

const app = express()

// CORS设置跨域访问
app.all('*', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  // res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
app.use('/purchase',purchase)
const stock = require('./router/fresh/stock')
app.use('/stock',stock)
const order = require('./router/fresh/order')
app.use('/order',order)

app.listen(8080, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功')
  }
})
