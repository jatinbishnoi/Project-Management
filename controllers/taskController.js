const { Task } = require('../models');

// CREATE Task
exports.createTask = async (req, res) => {
  const { title, description, projectId, deadline, assignedTo } = req.body;
  try {
    const task = await Task.create({ title, description, projectId, deadline, assignedTo });
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// UPDATE Task (edit any field including status)
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.update(req.body);  // req.body can have title, description, status, deadline, assignedTo
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// DELETE Task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    return res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// LIST Tasks by Project
exports.listTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.findAll({ where: { projectId } });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    return res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
