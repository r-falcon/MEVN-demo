var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Admin Page')
})

module.exports = router
