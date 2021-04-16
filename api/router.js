const { Router } = require('express')
const router = Router()

router.use('/contest', require('./contest/router'))

module.exports = router