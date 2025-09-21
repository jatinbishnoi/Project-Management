const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('todo', 'in_progress', 'done'),
    allowNull: false,
    defaultValue: 'todo'
  },
  deadline: { type: DataTypes.DATE },
  projectId: { type: DataTypes.INTEGER, allowNull: false },
  assignedTo: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'tasks',
  timestamps: true
});

module.exports = Task;
