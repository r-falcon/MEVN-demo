/**
 * https://blog.csdn.net/weixin_44795287/article/details/117432483
 * bcryptjs 加密
 * JWT(Json Web Token)是实现token技术的一种解决方案,JWT由三部分组成: header(头)、payload(载体)、signature(签名)
 */

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Purchase = require('../models/fresh/Purchase')
const Stock = require('../models/fresh/Stock')

module.exports = {
  router,
  bcrypt,
  jwt,

  User,
  Purchase
}