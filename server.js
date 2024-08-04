const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Comment = require('./models/comments');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB

//inside uri the URI of the database
//after the name I put the pass: 12345678Admin
// Added collection name: Node-API
// Connection string with the correct password and URI format
const uri = 'mongodb+srv://hanoufbarakaty:12345678Admin@devapi.td05unq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevAPI';


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a comment
app.post('/api/comments', async (req, res) => {
  try {
    // Create a new comment with the provided content
    const newComment = new Comment({ content: req.body.content });
    const savedComment = await newComment.save(); // Save to database
    res.status(201).json(savedComment); // Send the saved comment back
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send error message if something goes wrong
  }
});

// Get all comments
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find(); // Fetch all comments from database
    res.status(200).json(comments); // Send comments back to client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send error message if something goes wrong
  }
});

// Delete a comment by ID
app.delete('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id); // Delete comment by ID
    if (deletedComment) {
      res.status(200).json(deletedComment); // Send deleted comment back
    } else {
      res.status(404).json({ message: 'Comment not found' }); // Send not found message if comment does not exist
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Send error message if something goes wrong
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Start the server
});
