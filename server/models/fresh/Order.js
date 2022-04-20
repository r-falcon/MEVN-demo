var mongoose = require('mongoose')
var orderSchema = require('../../schemas/fresh/orders')

module.exports = mongoose.model('Order',orderSchema)