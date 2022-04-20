var mongoose = require('mongoose')
var stockSchema = require('../../schemas/fresh/stocks')

module.exports = mongoose.model('Stock',stockSchema)