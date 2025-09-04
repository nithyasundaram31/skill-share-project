const Comment = require('../models/Comment');
// Create Comment
exports.createComment = async (req, res) => {
  try {
    const { resource, text, user } = req.body;
    let comment = await Comment.create({ resource, user, text });

    // populate the user field before returning
    comment = await comment.populate("user", "name email");  

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get Comments for a Resource
exports.getCommentsByResource = async (req, res) => {
  try {
    const comments = await Comment.find({ resource: req.params.resourceId }).populate('user');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
