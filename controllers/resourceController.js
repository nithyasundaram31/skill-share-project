const Resource = require('../models/Resource');

// Create Resource
exports.createResource = async (req, res) => {
  try {
    const { title, term, category, videoUrl } = req.body;
    const resource = await Resource.create({ title, term, category, videoUrl });
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('category');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Resource
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('category');
    res.json(resource);
  } catch (error) {
    res.status(404).json({ error: 'Resource not found' });
  }
};

// Update Resource
exports.updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Resource
exports.deleteResource = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
