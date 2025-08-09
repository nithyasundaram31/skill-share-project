const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },

  // Link to Term
  term: { type: mongoose.Schema.Types.ObjectId, ref: 'Term', required: true },

  // Link to Category
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

  // Type of resource
  type: { 
    type: String, 
    enum: ['video', 'pdf', 'article', 'link'], 
    required: true 
  },

  // URL for resource
  url: { type: String, required: true },

  // Likes by users
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
