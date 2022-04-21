var mongoose = require('mongoose')
var astoresSchema = require('../../schemas/analysis/astores')

module.exports = mongoose.model('Astore', astoresSchema)