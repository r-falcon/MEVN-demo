var mongoose = require('mongoose')
var contentsSchema = require('../../schemas/article/contents')

module.exports = mongoose.model('Content', contentsSchema)