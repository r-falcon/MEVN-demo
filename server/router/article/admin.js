const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const Category = require('../models/Category')
const Content = require('../models/Content')

/**
 * 用户管理
 */
// 获取用户列表
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
        }, 0, '用户列表获取成功')
      })
  })
})

/**
 * 分类管理
 */
// 获取分类列表
router.get('/sortList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999

  Category.count().then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Category.find()
      .limit(limit)
      .skip(skip)
      .then((categories) => {
        res.sendResult({
            records: categories,
            total: count
          },
          0,
          '分类列表获取成功'
        )
      })
  })
})

// 添加分类
router.post('/sortAdd', (req, res) => {
  var name = req.body.name || ''

  Category.findOne({
    name: name
  }).then((category) => {
    if (category) {
      return res.sendResult(null, 1, '该分类已存在')
    } else {
      new Category({
        name: name
      }).save().then((newCategory) => {
        return res.sendResult(newCategory, 0, '分类添加成功')
      })
    }
  })
})

// 修改分类
router.post('/sortEdit', (req, res) => {
  var id = req.body._id || ''
  var name = req.body.name || ''
  Category.findOne({
    _id: id
  }).then((category) => {
    if (!category) {
      return res.sendResult(null, 1, '分类信息不存在')
    } else {
      if (name === category.name) {
        return res.sendResult(category, 0, '分类修改成功')
      } else {
        Category.findOne({
          _id: {
            $ne: id
          },
          name: name
        }).then(
          (sameCategory) => {
            if (sameCategory) {
              return res.sendResult(null, 1, '数据库中存在同名的分类')
            } else {
              Category.updateOne({
                _id: id
              }, {
                name: name
              }).then(
                (newCategory) => {
                  return res.sendResult(newCategory, 0, '分类修改成功')
                }
              )
            }
          }
        )
      }
    }
  })
})

// 删除分类
router.get('/sortDelete', (req, res) => {
  var id = req.query.id || ''

  Category.remove({
    _id: id
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

/**
 * 内容管理
 */
// 获取内容列表
router.get('/contentList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999

  Content.count().then((count) => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Content.find()
      .limit(limit)
      .skip(skip)
      .populate(['category', 'user'])
      .sort({
        addTime: -1
      })
      .then((contents) => {
        res.sendResult({
            records: contents,
            total: count
          },
          0,
          '内容列表获取成功'
        )
      })
  })
})

// 添加内容
router.post('/contentAdd', (req, res) => {
  const newCont = {
    category: req.body.category || '',
    title: req.body.title || '',
    user: req.cookies.user || '',
    description: req.body.description || '',
    content: req.body.content,
  }

  new Content(newCont).save().then((newContent) => {
    res.sendResult(newContent, 0, '内容添加成功')
  })
})

// 修改内容
router.post('/contentEdit', (req, res) => {
  var id = req.body._id || ''
  Content.updateOne({
    _id: id
  }, {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
  }).then((newContent) => {
    res.sendResult(newContent, 0, '内容修改成功')
  })
})

// 删除内容
router.get('/contentDelete', (req, res) => {
  var id = req.query.id || ''
  Content.remove({
    _id: id
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

// 文章评论
router.post('/contentComment', (req, res) => {
  var contentId = req.body.id
  var postData = {
    username: req.cookies.username,
    postTime: new Date(),
    comment: req.body.comment,
  }

  Content.findOne({
    _id: contentId
  }).then((content) => {
    content.comments.push(postData)
    content.save().then((newContent) => {
      res.sendResult(newContent, 0, '评论添加成功')
    })
  })
})

// 评论删除
router.get('/commentDelete', (req, res) => {
  var contentId = req.query.contentId || ''
  var comment = req.query.comment || ''

  Content.findOne({
      _id: contentId
    })
    .populate(['category', 'user'])
    .then((content) => {
      content.comments = content.comments.filter(
        (item) => item.comment !== comment
      )

      new Content(content).save().then((rs) => {
        res.sendResult(rs, 0, '删除成功')
      })
    })
})

module.exports = router