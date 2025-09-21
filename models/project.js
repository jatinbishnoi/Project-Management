const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  deadline: { type: DataTypes.DATE },
  createdBy: { type: DataTypes.INTEGER }
}, {
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;
