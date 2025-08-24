// routes/bookmarkRoutes.js
const express = require("express");
const { toggleBookmark, getUserBookmarks } = require("../controllers/bookmarkController");
const bookmarkRoute= express.Router();

bookmarkRoute.post("/toggle/:id", toggleBookmark);  // add/remove bookmark
bookmarkRoute.get("/user/:userId", getUserBookmarks); // get user bookmarked resources

module.exports = bookmarkRoute;
