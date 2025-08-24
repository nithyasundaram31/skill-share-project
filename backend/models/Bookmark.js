// models/Bookmark.js
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate bookmarks (same user + same resource)
bookmarkSchema.index({ user: 1, resource: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
