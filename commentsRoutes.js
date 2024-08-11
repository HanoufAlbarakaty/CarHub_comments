const express = require('express');
const router = express.Router();
const commentController = require('../Controllers/commentsController');

// Define routes and map them to controller functions
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.get('/search', commentController.searchComments);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
