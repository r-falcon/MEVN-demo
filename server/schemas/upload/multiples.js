var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  multipleList: {
    type: Array,
    default: () => []
  }
})