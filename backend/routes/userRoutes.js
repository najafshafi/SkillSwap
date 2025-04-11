const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { handleProfilePictureUpload } = require("../middleware/uploadMiddleware");

// All routes require authentication
router.use(authMiddleware);

// Get user profile
router.get("/profile", getProfile);

// Update user profile (with optional profile picture upload)
router.put("/profile", handleProfilePictureUpload, updateProfile);

module.exports = router; 