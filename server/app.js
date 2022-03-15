const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
// 引入数据库连接
require('./db/connect')

const app = express()

// CORS设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 统一返回响应机制
var resForm = require('./modules/resForm')
app.use(resForm)

// passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// 创建api
const mains = require('./router/main')
app.use('/', mains)
const apis = require('./router/api')
app.use('/api', apis)
const admins = require('./router/admin')
app.use('/admin', admins)

app.listen(8080, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功')
  }
})
