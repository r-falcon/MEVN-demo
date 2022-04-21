var mongoose = require('mongoose')
var purchasesSchema = require('../../schemas/fresh/purchases')

module.exports = mongoose.model('Purchase', purchasesSchema)