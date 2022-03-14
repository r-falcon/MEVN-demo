/**
 * 连接数据库
 */
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://falcon:falcon@127.0.0.1:27017/admin')
  .then(() => console.log('数据库连接成功'))
  .catch((err) => console.log('数据库连接失败', err))
