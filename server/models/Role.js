var mongoose = require('mongoose')
var roleSchema = require('../schemas/roles')

module.exports = mongoose.model('Role', roleSchema)
