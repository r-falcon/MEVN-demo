var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  // line
  title: String,
  xData: Array,
  yData: Array
})