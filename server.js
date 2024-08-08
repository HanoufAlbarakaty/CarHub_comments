const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Comment = require('./models/comments'); // Import the Comment model

const app = express();
const port = 5000;

// Middleware setup
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection string
const uri = 'mongodb+srv://hanoufbarakaty:12345678Admin@devapi.td05unq.mongodb.net/?retryWrites=true&w=majority&appName=DevAPI';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route to create a new comment
app.post('/api/comments', async (req, res) => {
  try {
    const newComment = new Comment({ content: req.body.content }); // Create a new comment document
    const savedComment = await newComment.save(); // Save the comment to the database
    res.status(201).json(savedComment); // Send the saved comment back to the client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// Route to update an existing comment by ID
app.put('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    // Find the comment by ID and update its content
    const updatedComment = await Comment.findByIdAndUpdate(id, { content: req.body.content }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: `Cannot find any comment with ID ${id}` }); // Handle case where comment is not found
    }
    
    res.status(200).json(updatedComment); // Send the updated comment back to the client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

app.get('/api/comments/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    try {
      const comments = await Comment.find({ content: new RegExp(query, 'i') });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });   

// Route to delete a comment by ID
app.delete('/api/comments/:id', async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the request parameters
      const deletedComment = await Comment.findByIdAndDelete(id); // Find and delete the comment by ID
  
      if (deletedComment) {
        res.status(200).json(deletedComment); // Send the deleted comment back to the client
      } else {
        res.status(404).json({ message: 'Comment not found' }); // Handle case where comment is not found
      }
    } catch (err) {
      res.status(500).json({ error: err.message }); // Handle errors
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Start the server
});
