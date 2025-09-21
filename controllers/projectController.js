const { Project, Task, User } = require('../models');
const { Op } = require('sequelize');

// Create Project
exports.createProject = async (req, res) => {
  const { name, description, deadline, members } = req.body;
  try {
    const project = await Project.create({ name, description, deadline, createdBy: req.user.id });
    if (Array.isArray(members) && members.length) {
      const users = await User.findAll({ where: { id: members } });
      await project.addMembers(users);
    }
    return res.status(201).json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List Projects
exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: User, as: 'members', through: { attributes: [] } }]
    });
    return res.json(projects);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Count tasks by status
exports.taskStatusCount = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.findAll({ where: { projectId } });
    const count = { todo: 0, in_progress: 0, done: 0 };
    tasks.forEach(task => count[task.status]++);
    return res.json(count);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// List overdue tasks
exports.overdueTasks = async (req, res) => {
  const { projectId } = req.params;
  try {
    const now = new Date();
    const tasks = await Task.findAll({
      where: {
        projectId,
        deadline: { [Op.lt]: now },
        status: { [Op.ne]: 'done' }
      }
    });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Project completion percentage
exports.projectProgress = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.findAll({ where: { projectId } });
    const total = tasks.length;
    const done = tasks.filter(task => task.status === 'done').length;
    const progress = total ? ((done / total) * 100).toFixed(2) : 0;
    return res.json({ totalTasks: total, doneTasks: done, progress: `${progress}%` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
