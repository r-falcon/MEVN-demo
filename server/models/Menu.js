var mongoose = require('mongoose')
var menuSchema = require('../schemas/menus')

module.exports = mongoose.model('Menu', menuSchema)
