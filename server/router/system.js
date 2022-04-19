/**
 * https://blog.csdn.net/weixin_44795287/article/details/117432483
 * bcryptjs 加密
 * JWT(Json Web Token)是实现token技术的一种解决方案,JWT由三部分组成: header(头)、payload(载体)、signature(签名)
 */

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

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
        res.sendResult({
          records: users,
          total: count
        }, 0, '获取成功')
      })
  })
})

/**
 * 添加用户
 */
router.post('/addUser', (req, res) => {
  var username = req.body.username || ''
  User.findOne({
    username: username
  }).then((user) => {
    if (user) {
      return res.sendResult(null, 1, '该用户已存在')
    } else {
      var newAdd = req.body
      newAdd.password = newAdd.password ? newAdd.password : '123456'
      newAdd.enable = newAdd.enable ? newAdd.enable : true
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newAdd.password, salt, function (err, hash) {
          if (err) throw err
          newAdd.password = hash
          new User(newAdd).save().then(newUser => {
            return res.sendResult(newUser, 0, '添加成功')
          })
        })
      })
    }
  })
})

/**
 * 根据id获取用户详情
 */
router.get('/getUserById', (req, res) => {
  var userId = req.query.id || ''

  if (userId == '') {
    return res.sendResult(null, 1, "请传入必要的参数")
  }

  User.findOne({
    _id: userId
  }).then((userInfo) => {
    return res.sendResult(userInfo, 0, "获取成功")
  })
})

/**
 * 修改用户
 */
router.post('/editUser', (req, res) => {
  User.updateOne({
    _id: req.body._id
  }, {
    username: req.body.username,
    nickname: req.body.nickname,
    phone: req.body.phone,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    avatar: req.body.avatar
  }).then((newUser) => {
    return res.sendResult(newUser, 0, '修改成功')
  })
})

/**
 * 删除用户
 */
router.get('/deleteUser', (req, res) => {
  var id = req.query.id || ''
  if (id == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  User.deleteOne({
    _id: id
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

/**
 * 重置密码
 */
router.post('/initPwd', (req, res) => {
  var id = req.body.id || ''

  if (id == '') {
    res.sendResult(null, 1, "请传输必要的参数")
  }

  let pass = '123456'
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash) {
      if (err) throw err
      pass = hash
      User.updateOne({
        _id: id
      }, {
        password: pass
      }).then((newUser) => {
        return res.sendResult(newUser, 0, '修改成功')
      })
    })
  })
})

/**
 * 启用状态修改
 */
router.post('/changeStatus',(req,res) => {
  var id = req.body.id || ''
  var status = req.body.enable 
  if(id == ''){
    res.sendResult(null,1,"请输入必要的参数")
  }
  User.updateOne({_id:id},{enable:status}).then((newUser) => {
    return res.sendResult(newUser,0,'状态修改成功')
  })
  
})

module.exports = router