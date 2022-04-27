var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  singleList: {
    type: Array,
    default: () => []
  }
})