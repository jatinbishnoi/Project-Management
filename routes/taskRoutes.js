const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, taskController.createTask);          // Create
router.put('/:id', auth, taskController.updateTask);        // Update/Edit
router.delete('/:id', auth, taskController.deleteTask);     // Delete
router.get('/project/:projectId', auth, taskController.listTasksByProject); // List by Project
router.delete('/:id', auth, taskController.deleteTask);


module.exports = router;
