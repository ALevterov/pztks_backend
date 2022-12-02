const Router = require('express')
const router = new Router()
const newsRouter = require('./newsRouter')
const userRouter = require('./userRouter')

router.use('/news', newsRouter)
router.use('/user', userRouter)

module.exports = router
