const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/tokenUtils');

// Student Register Controller
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, } = req.body;

        // validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //   if role is not student (protect from frontend )
        // if (role !== 'student') {
        //     return res.status(403).json({ message: "You are not allowed to register as admin." });
        // }
        //Hashing the Password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword, // hashed manually
        });

        await user.save();

        res.status(201).json({ user: { name, email, role: user.role }, message: "User successfully registered" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }

};

//  Login Controller (both Admin & Student)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials. Please try again.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials. Please try again.' });
        }

        //  if (isStudent && user.role !== 'student') {
        //     return res.status(403).json({ message: "Only students can login here." });
        // } 
        const token = await createToken(user);
        res.status(200).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                id: user._id,

            },
            message: "User successfully login"
        });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//  Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        const { name, contact } = req.body;
        // user.profile.address = address;
        user.name=name;
        // user.profile.dob = dob;
        user.profile.contact = contact;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong.", error: err.message });
    }
};

