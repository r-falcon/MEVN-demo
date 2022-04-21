var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  // pie
  title: String,
  legend: Array,
  pieData: Array
})