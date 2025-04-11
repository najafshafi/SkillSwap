const express = require("express");
const { login, signup } = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { handleProfilePictureUpload } = require("../middleware/uploadMiddleware");

// Public routes (no authentication required)
router.post("/signup", handleProfilePictureUpload, signup);
router.post("/login", login);

// // Protected routes (authentication required)
// // Example of a protected route
// router.get("/profile", authMiddleware, (req, res) => {
//     res.json({ message: "Protected route accessed successfully", userId: req.user.userId });
// });

module.exports = router;
