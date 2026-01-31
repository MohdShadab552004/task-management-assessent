const { body, param, query } = require('express-validator');

const createTaskValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),

    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed')
];

const updateTaskValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid task ID'),

    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Title cannot exceed 100 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),

    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed')
];

const getTaskValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid task ID')
];

const deleteTaskValidator = [
    param('id')
        .isMongoId()
        .withMessage('Invalid task ID')
];

const getTasksQueryValidator = [
    query('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Invalid status filter'),

    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];

module.exports = {
    createTaskValidator,
    updateTaskValidator,
    getTaskValidator,
    deleteTaskValidator,
    getTasksQueryValidator
};
