import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importing CSS file

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // Fetch todos from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  // Handle adding new todo
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const todoData = { task: newTodo, completed: false };

    axios.post('http://localhost:5000/api/todos', todoData)
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
  };

  // Handle editing a todo
  const handleEditTodo = (id, task) => {
    setIsEditing(true);
    setNewTodo(task);
    setEditTodoId(id);
  };

  // Handle toggling a todo completion
  const handleCompleteTodo = (id) => {
    const todo = todos.find(todo => todo._id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo)
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error completing todo:', error);
      });
  };

  // Handle saving the edited todo
  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/todos/${editTodoId}`, { task: newTodo })
      .then(response => {
        const updatedTodos = todos.map(todo => todo._id === editTodoId ? response.data : todo);
        setTodos(updatedTodos);
        setIsEditing(false);
        setNewTodo('');
        setEditTodoId(null);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter todo..."
      />
      {isEditing ? (
        <button onClick={handleSaveEdit}>Save</button>
      ) : (
        <button onClick={handleAddTodo}>Add Todo</button>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span>{todo.task}</span>
            <button onClick={() => handleCompleteTodo(todo._id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleEditTodo(todo._id, todo.task)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
