var mongoose = require('mongoose')
var singleSchema = require('../../schemas/upload/singles')

module.exports = mongoose.model('Single', singleSchema)