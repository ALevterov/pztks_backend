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
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, references: 'role' },
})
const Role = sequelize.define('role', {
  value: { type: DataTypes.STRING, defaultValue: 'USER' },
})
module.exports = {
  News,
  User,
  Role,
}
