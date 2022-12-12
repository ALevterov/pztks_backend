const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
router.get('/', newsController.getAll)
router.get('/:id', newsController.getById)
router.post('/:id', newsController.update)
router.post('/', checkRoleMiddleware('Admin'), newsController.create)
router.delete('/', checkRoleMiddleware('Admin'), newsController.remove)

module.exports = router
