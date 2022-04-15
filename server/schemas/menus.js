var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  name: String,
  icon: String,
  hidden: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'normal',
  },
  component: String,
  path: String,
  sort: Number,
})
