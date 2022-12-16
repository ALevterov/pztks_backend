require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/errorHandlingMiddleware') // обработчик ошибок
const PORT = process.env.PORT || 4000 // определим порт приложения
const path = require('path')
const sequelize = require('./db')

const app = express() // создаем приложение

app.use(cors()) // чтобы не было проблем с cors
app.use(express.json()) // для парсинга json
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({})) // загрузчик файлов
app.use('/api', router) // по роуту /api определяем корневой роутер приложения

// обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
  // функция запускающая приложение
  try {
    await sequelize.authenticate() // подключаемся к БД
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
  } catch (error) {}
}

start()
