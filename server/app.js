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
