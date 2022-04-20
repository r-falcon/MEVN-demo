var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  goodsName: String,
  goodsPrice: {
    type: Number,
    default: 0
  },
  goodsAmount: {
    type: Number,
    default: 0
  }
})