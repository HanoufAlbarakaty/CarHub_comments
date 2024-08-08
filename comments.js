const mongoose = require('mongoose');

// Define the schema for the comment
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Content is required and should be a string
  isDeleted: { type: Boolean, default: false}
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
