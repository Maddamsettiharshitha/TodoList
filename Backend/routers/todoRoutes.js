const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get all todos
router.get('/', todoController.getTodos);

// Create a new todo
router.post('/', todoController.createTodo);

// Update a todo by ID
router.put('/:id', todoController.updateTodo);

// Delete a todo by ID
router.delete('/:id', todoController.deleteTodo);

module.exports = router;