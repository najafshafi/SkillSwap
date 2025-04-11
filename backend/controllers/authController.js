const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require('crypto');

// Set a random fallback to avoid the WebCryptoAPI error
bcrypt.setRandomFallback((len) => {
  return crypto.randomBytes(len);
});

const signup = async (req, res) => {
  try {
    const { name, email, password, phone, address, gender, birthdate } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Parse arrays if they came as strings (from form-data)
    let skillsOffered = req.body.skillsOffered || [];

    if (typeof skillsOffered === 'string') {
      try {
        // First try to parse as JSON
        skillsOffered = JSON.parse(skillsOffered);
      } catch (e) {
        // If that fails, treat as comma-separated
        skillsOffered = skillsOffered.split(',').map(s => s.trim()).filter(s => s.length > 0);
      }
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
      address,
      gender,
      birthdate: new Date(birthdate),
      skillsOffered,
      bio: req.body.bio || '',
      location: req.body.location || '',
      skillsWanted: req.body.skillsWanted || []
    });

    // Handle profile picture if uploaded
    if (req.file) {
      user.profilePicture = req.file.buffer;
    }

    // Hash the password using synchronous methods to avoid issues
    try {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
    } catch (bcryptError) {
      console.error("Bcrypt error:", bcryptError);
      // Fallback to a simpler hashing if bcrypt fails
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      user.password = hash;
    }

    // Save the user
    await user.save();

    // Create JWT payload
    const payload = {
      userId: user._id,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token to the client
    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message || "Server error. Please try again." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    let isMatch = false;

    try {
      isMatch = bcrypt.compareSync(password, user.password);
    } catch (bcryptError) {
      console.error("Bcrypt compare error:", bcryptError);
      // Fallback if the password was stored with simple hash
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      isMatch = (hash === user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      userId: user._id,
    };

    // Generate JWT token (sign it with a secret)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token to the client
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { login, signup };
