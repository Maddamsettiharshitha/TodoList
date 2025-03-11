
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routers/todoRoutes');
const cors = require('cors');
const app = express();
app.use(express.json()); 
app.use(cors());
mongoose.connect('mongodb://localhost:27017/')       
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error: ', err));

// Use routes
app.use('/api/todos', todoRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

