var mongoose = require('mongoose')
var purchaseSchema = require('../../schemas/fresh/purchases')

module.exports = mongoose.model('Purchase',purchaseSchema)