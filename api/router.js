const { Router } = require('express')
const router = Router()

router.use('/contest', require('./contest/router'))
router.use('/committee', require('./committee/router'))

module.exports = router