var mongoose = require('mongoose')
var multipleSchema = require('../../schemas/upload/multiples')

module.exports = mongoose.model('Multiple', multipleSchema)