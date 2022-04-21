var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  // bar
  title: String,
  xData: Array,
  yData: Array
})