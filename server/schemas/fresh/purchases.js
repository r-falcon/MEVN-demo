var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  PNo: String,
  goodsName: String,
  goodsCompany: String,
  goodsAddress: String,
  goodsSort: String,
  goodsPrice: {
    type: Number,
    default: 0
  },
  goodsAmount: {
    type: Number,
    default: 0
  },
  isPay: {
    type: Boolean,
    default: false
  },
  isTrans: {
    type: Boolean,
    default: false
  },
  createTime:{
    type: Date,
    default: new Date(),
  }
})