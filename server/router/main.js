var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Main Page')
})

module.exports = router
