const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    unique: true, // no duplicate terms like "Frontend"
    trim: true
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Term', termSchema);
