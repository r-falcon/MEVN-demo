/**
 * https://blog.csdn.net/weixin_44795287/article/details/117432483
 * bcryptjs 加密
 * JWT(Json Web Token)是实现token技术的一种解决方案,JWT由三部分组成: header(头)、payload(载体)、signature(签名)
 */

const express = require('express')
const router = express.Router()

const User = require('../models/User')

/**
 * 获取用户列表
 */
router.get('/userList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999

  User.count().then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    User.find()
      .limit(limit)
      .skip(skip)
      .then((users) => {
        res.sendResult({ records: users, total: count }, 0, '获取用户列表成功')
      })
  })
})

module.exports = router
