const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/userList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 2

  User.count().then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    User.find()
      .limit(limit)
      .skip(skip)
      .then((users) => {
        res.sendResult({ records: users, total: count }, 0, '用户列表获取成功')
      })
  })
})

module.exports = router
