var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  ONo: String,
  goodsName: String,
  goodsPrice: {
    type: Number,
    default: 0
  },
  buyPrice: {
    type: Number,
    default: 0
  },
  buyAmount: {
    type: Number,
    default: 0
  },
  buyer: String,
  buyerAddress: String,
  buyerPhone: String,
  isPay: {
    type: Boolean,
    default: false
  },
  isTrans: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: new Date(),
  }
})