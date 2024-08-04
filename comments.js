const mongoose = require('mongoose');

// Define the schema for the comment
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true } // Content is required and should be a string
});

// Create and export the Comment model based on the schema
module.exports = mongoose.model('Comment', commentSchema);
