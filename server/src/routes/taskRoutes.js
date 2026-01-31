const express = require('express');
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const {
    createTaskValidator,
    updateTaskValidator,
    getTaskValidator,
    deleteTaskValidator,
    getTasksQueryValidator
} = require('../validators/taskValidator');
const validate = require('../middleware/validate');
const cacheMiddleware = require('../middleware/cacheMiddleware');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// GET /api/tasks - Get all tasks with caching
router.get(
    '/',
    getTasksQueryValidator,
    validate,
    cacheMiddleware('tasks'),
    getAllTasks
);

// GET /api/tasks/:id - Get single task with caching
router.get(
    '/:id',
    getTaskValidator,
    validate,
    cacheMiddleware('tasks'),
    getTaskById
);

// POST /api/tasks - Create new task
router.post(
    '/',
    createTaskValidator,
    validate,
    createTask
);

// PUT /api/tasks/:id - Update task
router.put(
    '/:id',
    updateTaskValidator,
    validate,
    updateTask
);

// DELETE /api/tasks/:id - Delete task
router.delete(
    '/:id',
    deleteTaskValidator,
    validate,
    deleteTask
);

module.exports = router;
