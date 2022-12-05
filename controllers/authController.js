const ApiError = require('../errors/ApiError')
const bcrypt = require('bcryptjs')
const { User } = require('../models/models')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { ACCESS_SECRET_KEY } = require('config')
const generateAccesToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest(errors))
      }
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует')
        )
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = await User.create({
        email,
        password: hashPassword,
        role: 'User', // один раз изменяем код и создаем Admin
      })
      const token = generateAccesToken(user.id, user.roles)
      return res.json({ access: token })
    } catch (error) {
      return next(ApiError.internal('Ошибка регистрации'))
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (!candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email не существует')
        )
      }
      const validPassword = bcrypt.compareSync(password, candidate.password)
      if (!validPassword) {
        return next(ApiError.badRequest('Неверный пароль'))
      }
      const token = generateAccesToken(candidate.id, candidate.roles)
      return res.json({ access: token })
    } catch (error) {}
  }

  // async check(req, res, next) {
  //   const { id } = req.params
  //   if (!id) {
  //     return next(ApiError.badRequest('не задан id'))
  //   }
  //   res.json({ id })
  // }
}

module.exports = new AuthController()
