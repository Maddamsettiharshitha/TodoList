const Todo = require('../models/todo');

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    const { task, completed } = req.body;

    const newTodo = new Todo({
        task,
        completed
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};