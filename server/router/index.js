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
const Order = require('../models/fresh/Order')
const Abuy = require('../models/analysis/Abuy')
const Astore = require('../models/analysis/Astore')
const ATrans = require('../models/analysis/Atrans')
const Category = require('../models/article/Category')
const Content = require('../models/article/Content')
const Single = require('../models/upload/Single')
const Multiple = require('../models/upload/Multiple')

module.exports = {
  router,
  bcrypt,
  jwt,

  User,
  Purchase,
  Stock,
  Order,
  Abuy,
  Astore,
  ATrans,
  Category,
  Content,
  Single,
  Multiple
}