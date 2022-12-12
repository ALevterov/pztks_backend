const fs = require('fs')
const path = require('path')
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
    const { id: newsId } = req.params
    if (!newsId) {
      return next(ApiError.badRequest('не задан id новости'))
    }
    const news = await News.findAll({ where: { id: newsId } })
    return res.json(news)
  }

  async update(req, res, next) {
    try {
      const { id: newsId } = req.params
      if (!newsId) {
        return next(ApiError.badRequest('не задан id новости'))
      }
      const news = await News.findOne({ where: { id: newsId } })
      let data = req.body
      const dir = data.date.replaceAll('/', '-')
      console.log(data.date)

      const image = req.files?.image
      if (image) {
        const resultDirectory = path.resolve(
          __dirname,
          '..',
          'static',
          news.image
        )
        fs.unlinkSync(resultDirectory, error => {
          if (error) {
            console.log("can't delete image", error)
          }
        })

        let fileName = uuid.v4() + '.jpg'
        saveImage(image, dir, fileName)

        const newNews = await news.update({
          ...data,
          image: dir + '/' + fileName,
        })
        return res.json(newNews)
      }
      delete data.image
      console.log(image)
      const newNews = await news.update({ ...data })
      return res.json(newNews)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    return res.json(news)
  }

  async remove(req, res, next) {
    const { id: newsId } = req.query
    console.log(newsId)
    if (!newsId) {
      return next(ApiError.badRequest('не задан id новости'))
    }
    const news = await News.destroy({ where: { id: newsId } })
    return res.json(news)
  }
}

module.exports = new NewsController()
