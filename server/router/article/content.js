const {
  router,
  Content
} = require('../index')

/**
 * 获取内容列表
 */
router.get('/contentList', (req, res) => {
  var page = req.query.pagenum || 1
  var limit = req.query.pagesize || 999
  var query = req.query.query || ''
  var reg = new RegExp(query, 'i')
  var _filter = {
    $or: [{
      title: {
        $regex: reg
      }
    }]
  }

  Content.count(_filter).then(count => {
    var pages = Math.ceil(count / limit)
    page = Math.min(page, pages)
    page = Math.max(page, 1)
    var skip = (page - 1) * limit

    Content.find(_filter).limit(limit).skip(skip).populate(['category', 'user']).sort({
      createTime: -1
    }).then((contents) => {
      res.sendResult({
        records: contents,
        total: count
      }, 0, "获取成功")
    })
  })
})

/**
 * 添加内容
 */
router.post('/addContent', (req, res) => {
  const newCont = {
    category: req.body.category || '',
    user: JSON.parse(req.cookies.user) || '',
    title: req.body.title || '',
    description: req.body.description || '',
    content: req.body.content || ''
  }

  new Content(newCont).save().then((newContent) => {
    res.sendResult(newContent, 0, '添加成功')
  })
})

/**
 * 修改内容
 */
router.post('/editContent', (req, res) => {
  var id = req.body._id || ''
  if (id == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }
  Content.updateOne({
    _id: id
  }, {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  }).then((newContent) => {
    res.sendResult(newContent, 0, '修改成功')
  })
})

/**
 * 删除内容
 */
router.get('/deleteContent', (req, res) => {
  var id = req.query.id || ''
  if (id == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }
  Content.remove({
    _id: id
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})

/**
 * 文章评论-添加
 */
router.post('/addComment', (req, res) => {
  var id = req.body.id || ''
  if (id == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  Content.findOne({
    _id: id
  }).then((content) => {
    const newComment = {
      id: content.comments.length,
      user: (JSON.parse(req.cookies.user)).username || '',
      comment: req.body.comment,
      createTime: new Date()
    }

    Content.updateOne({
      _id: id
    }, {
      $push: {
        comments: newComment
      }
    }).then((newComment) => {
      res.sendResult(newComment, 0, '评论成功')
    })
  })
})

/**
 * 文章评论-删除
 */
router.post('/deleteComment', (req, res) => {
  console.log(req.body);
  var id = req.body.id || ''
  var commentId = req.body.commentId
  if (id == '') {
    res.sendResult(null, 1, '请传入必要的参数')
  }

  Content.updateOne({
    _id: id
  }, {
    $pull: {
      comments: {
        id: commentId
      }
    }
  }).then(() => {
    res.sendResult(null, 0, '删除成功')
  })
})


module.exports = router