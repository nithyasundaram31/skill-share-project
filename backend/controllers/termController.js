const Term = require('../models/Term');

// Create Term
exports.createTerm = async (req, res) => {
  try {
    const { name } = req.body;
    const term = await Term.create({ name });
      const existingTerm = await User.findOne({ name });
    
            if (existingTerm) {
                return res.status(400).json({ message: 'term already exists' });
            }
            console.log(existingTerm)
    
    res.status(201).json({term, message:"Term creation sucessfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get All Terms
exports.getTerms = async (req, res) => {
  try {
    const terms = await Term.find();
    
    res.status(201).json({terms});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Term
exports.updateTerm = async (req, res) => {
  try {
    const term = await Term.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(term);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Term
exports.deleteTerm = async (req, res) => {
  try {
    await Term.findByIdAndDelete(req.params.id);
    res.json({ message: 'Term deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
