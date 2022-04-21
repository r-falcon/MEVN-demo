var mongoose = require('mongoose')
var categoriesSchema = require('../../schemas/article/categories')

module.exports = mongoose.model('Category', categoriesSchema)