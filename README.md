# 搭建 MEVN（MongoDB+express+vue+node）后台管理系统

## 前端

### 搭建 vue2 项目，（这里直接使用 ruoyi 的框架）

`npm init webpack vue-demo`，搭建 vue 项目，vue-demo 为项目名称

### 修改框架，完成登录注册逻辑，路由导航守卫、动态菜单、统一接口封装等问题

### 启动项目

`cd vue-demo`
`npm run dev`

## 后端

### 初始化项目

`npm init`

### 创建服务器，监听端口，创建 app.js

```js
// app.js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(8080, (err) => {
  if (err) {
    console.log('服务器启动失败')
  } else {
    console.log('服务器启动成功')
  }
})
```

### 连接数据库，模块化，db.js

```js
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://falcon:falcon@127.0.0.1:27017/admin')
  .then(() => console.log('数据库连接成功'))
  .catch((err) => console.log('数据库连接失败', err))
```

### 设置跨域、jwt 用户安全校验等一系列准备工作

### 完成用户登录注册的逻辑
