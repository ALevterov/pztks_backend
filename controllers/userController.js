const ApiError = require('../errors/ApiError')

class UserController {
  async registration(req, res) {}

  async login(req, res) {
    res.json({ message: 'suck my dick' })
  }

  async check(req, res, next) {
    const { id } = req.query
    if (!id) {
      return next(ApiError.badRequest('не задан id'))
    }
    res.json({ id })
  }
}

module.exports = new UserController()
