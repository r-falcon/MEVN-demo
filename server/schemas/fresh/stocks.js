var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  goodsName: String,
  goodsSort: String,
  goodsPrice: {
    type: Number,
    default: 0
  },
  goodsAmount: {
    type: Number,
    default: 0
  },
  saleAmount: {
    type: Number,
    default: 0
  },
  storeAmount: {
    type: Number,
    default: 0
  }
})