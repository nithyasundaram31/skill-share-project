const cloudinary = require("../utils/cloudinary");

const fileController = {
  uploadSingleFile: async (req, res) => {
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.files.file;
      
      // Upload PDF/Docs to Cloudinary 
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "raw",   //  use raw for PDF/Docs
        folder: "resources",   
        use_filename: true,
        unique_filename: false,
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  },
};

module.exports = fileController;
