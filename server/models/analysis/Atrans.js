var mongoose = require('mongoose')
var atransSchema = require('../../schemas/analysis/atrans')

module.exports = mongoose.model('Atrans', atransSchema)