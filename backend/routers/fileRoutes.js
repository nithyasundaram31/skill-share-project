const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const fileController = require("../controllers/fileController");

// enable file upload
router.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

// route
router.post("/single", fileController.uploadSingleFile);

module.exports = router;
