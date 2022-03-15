/**
 * https://blog.csdn.net/weixin_44795287/article/details/117432483
 * bcryptjs 加密
 *
 * JWT(Json Web Token)是实现token技术的一种解决方案,JWT由三部分组成: header(头)、payload(载体)、signature(签名)
 */

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../models/User')

/**
 * 用户注册
 */
router.post('/register', (req, res) => {
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  }

  User.findOne({ username: newUser.username }).then((userInfo) => {
    if (userInfo) {
      return res.sendResult(null, 1, '该用户已存在')
    }
    var userOne = new User(newUser)
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(userOne.password, salt, function (err, hash) {
        if (err) throw err
        userOne.password = hash
        userOne.save().then((newUserInfo) => {
          return res.sendResult(newUserInfo, 0, '注册成功')
        })
      })
    })
  })
})

/**
 * 用户登录
 */
router.post('/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password

  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.sendResult(null, 1, '用户不存在')
    }

    // 当前时间
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let nowDate = year + '.' + month + '.' + day + ' ' + h + ':' + m

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // jwt.sign('规则', '加密名字', '过期时间', '回调函数')
        let rule = {
          username: user.username,
          password: user.password,
          nowDate: nowDate,
        }
        jwt.sign(rule, 'secret', { expiresIn: 60 * 60 * 24 }, (err, token) => {
          if (err) throw err
          return res.sendResult(
            { token: 'Bearer ' + token, user: user },
            0,
            '登录成功'
          )
        })
      } else {
        return res.sendResult(null, 1, '密码错误')
      }
    })
  })
})

module.exports = router
