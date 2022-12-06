require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')
// const models = require('./models/models')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const PORT = process.env.PORT || 4000
const path = require('path')
const sequelize = require('./db')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибок, последний middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`)
    })
  } catch (error) {}
}

start()
