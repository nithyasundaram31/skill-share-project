const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },

  // Link to Term
  term: { type: mongoose.Schema.Types.ObjectId, ref: 'Term', required: true },

   description: { type: String, trim: true },

  // Link to Category
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

  // Type of resource
  type: {                       
    type: String, 
    enum: ['video', 'pdf', 'blog', 'link'], 
    required: true 
  },

  // URL for resource
  url: { type: String, required: true },
  views: { type: Number, default: 0 } ,
   viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,

  // Likes by users
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]


}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
