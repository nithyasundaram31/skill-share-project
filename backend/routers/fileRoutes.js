const express = require('express');
const { uploadSingleFile } = require('../controllers/fileController');
const upload = require('../utils/upload');

const fileRouter = express.Router();

fileRouter.post('/single', upload.single('file'), uploadSingleFile);

module.exports = fileRouter;