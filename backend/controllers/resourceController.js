const Resource = require('../models/Resource');
const mongoose = require('mongoose');
 // Create Resource
exports.createResource = async (req, res) => { 
  try {
    const { title, description, term, category, type, url } = req.body;

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
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const userIdObjectId = new mongoose.Types.ObjectId(userId);

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Initialize viewers array if it doesn't exist
    if (!resource.viewers) {
      resource.viewers = [];
    }

    // Filter out null/undefined values and check if user already viewed
    const cleanViewers = resource.viewers.filter(viewer => viewer !== null && viewer !== undefined);
    const alreadyViewed = cleanViewers.some(viewer => {
      if (!viewer) return false;
      const isMatch = viewer.toString() === userIdObjectId.toString();

      return isMatch;
    });
    if (!alreadyViewed) {
      resource.viewers.push(userIdObjectId);
    }
    resource.viewers = cleanViewers.concat(alreadyViewed ? [] : [userIdObjectId]);
    resource.views = resource.viewers.length;
    const savedResource = await resource.save();
    res.json({ views: savedResource.views });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// controllers/resourceController.js
exports.toggleLike = async (req, res) => {
  const { id } = req.params;      // resource id
  const { userId } = req.body;    // logged-in user id

  try {
    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    let liked;

    // Check if already liked (convert both to string for safe comparison)
    if (resource.likes.some(u => u.toString() === userId.toString())) {
      // remove like
      resource.likes = resource.likes.filter(
        u => u.toString() !== userId.toString()
      );
      liked = false;
    } else {
      // add like (cast to ObjectId for consistency)
      resource.likes.push(userId);
      liked = true;
    }

    await resource.save();

    res.json({
      liked,
      likesCount: resource.likes.length
    });
  } catch (error) {
    console.log("Toggle like error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
