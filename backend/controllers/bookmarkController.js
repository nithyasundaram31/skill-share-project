const Bookmark = require("../models/Bookmark");

exports.toggleBookmark = async (req, res) => {
  try {
    const { id: resourceId } = req.params; // resource id
    const { userId } = req.body; // user id

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({ user: userId, resource: resourceId });

    if (existingBookmark) {
      // If already bookmarked  remove it
      await existingBookmark.deleteOne();
      return res.json({
        success: true,
        message: "Bookmark removed",   
        isBookmarked: false,
      });
    }

    // If not bookmarked create new one
    const newBookmark = new Bookmark({ user: userId, resource: resourceId });
    await newBookmark.save();

    // Populate user & resource details
    await newBookmark.populate("user", "name");
    await newBookmark.populate("resource");

    return res.json({
      success: true,
      message: "Bookmark added",
      isBookmarked: true,
      bookmark: newBookmark,
    });
  } catch (error) {
    console.error("Toggle Bookmark Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all bookmarks of a user
exports.getUserBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookmarks = await Bookmark.find({ user: userId })
      // .populate("resource") 
       .populate({
    path: "resource",
    populate: [{ path: "term", select: "name" }, { path: "category", select: "name" }]
  })
      .populate("user", "name");      

    res.json(bookmarks);
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
