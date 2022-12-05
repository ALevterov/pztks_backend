const Router = require('express')
const router = new Router()
const newsRouter = require('./newsRouter')
const authRouter = require('./authRouter')

router.use('/news', newsRouter)
router.use('/auth', authRouter)

module.exports = router
