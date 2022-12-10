const uuid = require('uuid')
const ApiError = require('../errors/ApiError')
const { News } = require('../models/models')
const saveImage = require('../utils/saveImage')
class NewsController {
  async create(req, res, next) {
    try {
      let data = req.body
      const dir = data.date.replaceAll('/', '-')

      const { image } = req.files

      let fileName = uuid.v4() + '.jpg'
      saveImage(image, dir, fileName)
      const news = await News.create({
        ...data,
        image: dir + '/' + fileName,
      })

      return res.json(news)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const { date } = req.query
    let news
    if (!date) {
      news = await News.findAll()
    }
    if (date) {
      news = await News.findAll({ where: { date } })
    }
    return res.json(news)
  }

  async getById(req, res, next) {
    const { id: newsIdnewsId } = req.query
    if (!newsId) {
      return next(ApiError.badRequest('не задан id новости'))
    }
    const news = await News.findAll({ where: { id: newsId } })
    return res.json(news)
  }
  async remove(req, res, next) {
    const { id: newsId } = req.query
    console.log(id)
    if (!newsId) {
      return next(ApiError.badRequest('не задан id новости'))
    }
    const news = await News.destroy({ where: { id: newsId } })
    return res.json(news)
  }
}

module.exports = new NewsController()
