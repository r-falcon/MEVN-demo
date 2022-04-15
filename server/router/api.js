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

const User = require('../models/User')
// const Menu = require('../models/Menu')

/**
 * 用户注册
 */
router.post('/register', (req, res) => {
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  }

  User.findOne({
    username: newUser.username,
  }).then((userInfo) => {
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

  User.findOne({
    username: username,
  }).then((user) => {
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
        jwt.sign(
          rule,
          'secret',
          {
            expiresIn: 60 * 60 * 24,
          },
          (err, token) => {
            if (err) throw err
            return res.sendResult(
              {
                token: 'Bearer ' + token,
                user: user,
              },
              0,
              '登录成功'
            )
          }
        )
      } else {
        return res.sendResult(null, 1, '密码错误')
      }
    })
  })
})

/**
 * 获取用户信息列表
 */
router.get('/getUsers', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999

  User.count().then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    User.find()
      .limit(limit)
      .skip(skip)
      .then((userList) => {
        res.sendResult(
          0,
          { records: userList, total: count },
          0,
          '获取用户列表成功'
        )
      })
  })
  // var userId = req.query.userId || ''
  // if (userId == '') {
  //   return res.sendResult(null, 1, '请传递必要的参数')
  // }
  // Info.find()
  //   .populate('user')
  //   .then((userInfo) => {
  //     let info = {}
  //     userInfo.filter((item) => {
  //       if (item.user._id.toString() == userId) {
  //         info = item
  //         return
  //       }
  //     })
  //     res.sendResult(info, 0, '获取用户详情成功')
  //   })
})

/**
 * 查询分类列表详情
 */
router.get('/getUsersById', (req, res) => {
  var userId = req.query.userId || ''
  if (userId == '') {
    return res.sendResult(null, 1, '请传递必要的参数')
  }
  User.findOne({ _id: userId }).then((userInfo) => {
    res.sendResult(userInfo, 0, '获取用户详情成功')
  })
})

/**
 * 获取动态路由
 */
// router.get('/getMenus', (req, res) => {
//   Menu.find().then((menuList) => {
//     if (menuList.length > 0) {
//       User.findOne({ username: req.cookies.username }).then((res) => {
//         let list = []
//         let key = res.isAdmin ? 'admin' : 'normal'
//         menuList = JSON.parse(JSON.stringify(menuList))
//         menuList.map((item) => {
//           item.meta.roles.includes(key) ? list.push(item) : null
//         })
//         menuList = list
//       })
//     }
//     res.sendResult(menuList, 0, '获取动态路由成功')
//   })
// })

module.exports = router
