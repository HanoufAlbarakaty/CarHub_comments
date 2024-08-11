const Comment = require('../models/comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment({ content: req.body.content });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, { content: req.body.content }, { new: true });
    
    if (!updatedComment) {
      return res.status(404).json({ message: `Cannot find any comment with ID ${id}` });
    }
    
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search comments
exports.searchComments = async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const regex = new RegExp(query, 'i');
    const comments = await Comment.find({ content: regex });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment (soft delete)
exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: `Cannot find any comment with ID ${id}` });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
