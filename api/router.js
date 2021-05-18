const { Router } = require('express')
const router = Router()

router.use('/contest', require('./contest/router'))
router.use('/committee', require('./committee/router'))
router.use('/image', require('./image/router'))

module.exports = router