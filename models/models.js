const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const News = sequelize.define('news', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  mainText: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  source: { type: DataTypes.STRING },
})

module.exports = {
  News,
}
