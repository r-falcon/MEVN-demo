const {
  router,
  Category
} = require('../index')

/**
 * 获取分类列表
 */
router.get('/sortList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query, 'i')
  var _filter = {
    name: {
      $regex: reg
    }
  }

  Category.count(_filter).then(count => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Category.find(_filter).limit(limit).skip(skip).then((categories) => {
      res.sendResult({
        records: categories,
        total: count
      }, 0, "获取成功")
    })
  })
})

/**
 * 添加分类
 */
router.post('/addCategory', (req, res) => {
  var name = req.body.name || ''
  Category.findOne({
    name: name
  }).then((categories) => {
    if (categories) {
      return res.sendResult(null, 1, "该分类已存在")
    } else {
      new Category(req.body).save().then(newCategory => {
        return res.sendResult(newCategory, 0, "添加成功")
      })
    }
  })
})

/**
 * 修改分类
 */
router.post('/editCategory', (req, res) => {
  var id = req.body._id || ''
  var name = req.body.name || ''

  Category.findOne({
    _id: id
  }).then((category) => {
    if (!category) {
      return res.sendResult(null, 1, '分类信息不存在')
    } else {
      if (name == category.name) {
        return res.sendResult(category, 0, '分类修改成功')
      } else {
        Category.findOne({
          _id: {
            $ne: id
          },
          name: name
        }).then((sameCategory) => {
          if (sameCategory) {
            return res.sendResult(null, 1, '数据库中存在同名的分类')
          } else {
            Category.updateOne({
              _id: id
            }, {
              name: name,
              desc: desc
            }).then((newCategory) => {
              return res.sendResult(newCategory, 0, '分类修改成功')
            })
          }
        })
      }
    }
  })
})

/**
 * 删除分类
 */
router.get('/deleteCategory', (req, res) => {
  var id = req.query.id || ''
  if (id == '') {
    res.sendResult(null, 1, "请传入必要的参数")
  }

  Category.deleteOne({
    _id: id
  }).then(() => {
    res.sendResult(null, 0, "删除成功")
  })
})


module.exports = router