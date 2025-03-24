// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser._id),
            },
        });
    } catch (error) {
        res.status(500).json({"err":"error in register", message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        // Find user by ID and exclude the password field
        const user = await User.findById(req.user.id).select('-password');
        
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found'
            });
        }

        // Return the user data
        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            user
        });
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Server error: ' + error.message 
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};
