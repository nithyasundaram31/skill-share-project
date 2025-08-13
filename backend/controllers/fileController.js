const File = require('../models/file');

const fileController = {
  uploadSingleFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

     const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      const newFile = new File({
        name: req.file.filename,
        path:fileUrl ,
        type: req.file.mimetype,
        size: req.file.size,
      });

      await newFile.save();

      // Return saved file info along with success message
      return res.status(200).json({ 
        message: 'File uploaded successfully',
        file: newFile,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading file', error });
    }
  }
}

module.exports = fileController;
