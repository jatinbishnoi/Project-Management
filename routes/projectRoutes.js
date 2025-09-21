const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');
const permit = require('../middlewares/roleMiddleware');

// Project CRUD
router.post('/', auth, permit('admin', 'manager'), projectController.createProject);
router.get('/', auth, projectController.listProjects);

// Dashboard / Reporting endpoints
router.get('/:projectId/tasks/status-count', auth, projectController.taskStatusCount);
router.get('/:projectId/tasks/overdue', auth, projectController.overdueTasks);
router.get('/:projectId/progress', auth, projectController.projectProgress);

module.exports = router;
