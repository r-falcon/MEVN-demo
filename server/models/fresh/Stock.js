var mongoose = require('mongoose')
var stocksSchema = require('../../schemas/fresh/stocks')

module.exports = mongoose.model('Stock', stocksSchema)