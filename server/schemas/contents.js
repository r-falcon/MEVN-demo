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

  addTime: {
    type: Date,
    default: new Date(),
  },
  views: {
    type: Number,
    default: 0,
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
