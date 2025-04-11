const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header - standard format is "Bearer [token]"
    const authHeader = req.header('Authorization');

    // Check if auth header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Parse the token - remove "Bearer " prefix if it exists
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7, authHeader.length)
        : authHeader;

    if (!token) {
        return res.status(401).json({ message: "Access denied. Invalid token format." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user data to request
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
