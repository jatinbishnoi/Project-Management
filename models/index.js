const sequelize = require('../config/db');
const User = require('./user');
const Project = require('./project');
const Task = require('./task');
const UserStory = require('./userStory');

// Many-to-many project members
Project.belongsToMany(User, { through: 'ProjectMembers', as: 'members' });
User.belongsToMany(Project, { through: 'ProjectMembers', as: 'projects' });

// Task relations
Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });

// UserStories
Project.hasMany(UserStory, { foreignKey: 'projectId' });
UserStory.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { sequelize, User, Project, Task, UserStory };
