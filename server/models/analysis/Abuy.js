var mongoose = require('mongoose')
var abuysSchema = require('../../schemas/analysis/abuys')

module.exports = mongoose.model('Abuy', abuysSchema)