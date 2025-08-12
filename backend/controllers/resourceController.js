const Resource = require('../models/Resource');

// Create Resource
exports.createResource = async (req, res) => {
  try {
    const { title,description, term, category, type, url } = req.body;

    const resource = await Resource.create({
      title,        
      term,
      description,
      category,
      type,
      url
    });

    res.status(201).json({
      message: "Resource created successfully",
      resource
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('term', 'name')
      .populate('category', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Resource
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('term', 'name')
      .populate('category', 'name');

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Resource
exports.updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    )
    .populate('term', 'name')
    .populate('category', 'name');

    if (!updated) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({
      message: "Resource updated successfully",
      updated
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Resource
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
