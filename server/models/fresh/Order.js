var mongoose = require('mongoose')
var ordersSchema = require('../../schemas/fresh/orders')

module.exports = mongoose.model('Order', ordersSchema)