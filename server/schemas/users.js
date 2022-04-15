var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  email: String,
  phone: String,
  enable: {
    type: Boolean,
    default: true,
  },
  avatar: String,
  createTime: {
    type: Date,
    default: new Date(),
  },
})
