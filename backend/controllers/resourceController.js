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

// Increment views
exports.incrementViews = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Resource not found' });

    resource.views += 1; // increase view count
    await resource.save();

    res.json({ views: resource.views });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.likeResource = async (req, res) => {
  try {
    const { userId } = req.body; // userId sent from frontend
    const resource = await Resource.findById(req.params.id);

    if (!resource) return res.status(404).json({ message: "Resource not found" });

    
    if (!resource.likes.includes(userId)) {
      resource.likes.push(userId);
    }

    await resource.save();
    res.json({ likes: resource.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.dislikeResource = async (req, res) => {
  try {
    const { userId } = req.body; // userId sent from frontend
    const resource = await Resource.findById(req.params.id);

    if (!resource) return res.status(404).json({ message: "Resource not found" });

    // Add user to dislikes array 
    if (!resource.dislikes.includes(userId)) {
      resource.dislikes.push(userId);
    }

    await resource.save();
    res.json({ dislikes: resource.dislikes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
