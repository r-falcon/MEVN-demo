var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  // 关联字段 - 分类
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // 关联字段 - 作者
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  createTime: {
    type: Date,
    default: new Date(),
  },
  title: String,
  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  comments: {
    type: Array,
    default: [],
  },
})