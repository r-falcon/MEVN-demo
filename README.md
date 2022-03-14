# 搭建 MEVN（MongoDB+express+vue+node）后台管理系统

## 前端

### 搭建 vue2 项目，（这里直接使用 ruoyi 的框架）

`npm init webpack vue-demo`，搭建 vue 项目，vue-demo 为项目名称

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
