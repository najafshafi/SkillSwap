const multer = require('multer');

// Configure storage
const storage = multer.memoryStorage(); // Store files in memory as Buffer

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Create the multer upload instance with size limits
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // Increased to 10MB file size limit
        fieldSize: 10 * 1024 * 1024, // Also increased field size limit for base64 encoded images
    }
});

// Profile picture upload middleware
const profilePictureUpload = upload.single('profilePicture');

// Course image upload middleware
const courseImageUpload = upload.single('courseImage');

// Wrapper to handle errors from multer for profile pictures
const handleProfilePictureUpload = (req, res, next) => {
    profilePictureUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
            } else if (err.code === 'LIMIT_FIELD_VALUE') {
                return res.status(400).json({ message: 'The image data is too large. Please use a smaller image.' });
            }
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred
            return res.status(400).json({ message: err.message });
        }
        // Everything went fine
        next();
    });
};

// Wrapper to handle errors from multer for course images
const handleCourseImageUpload = (req, res, next) => {
    courseImageUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
            } else if (err.code === 'LIMIT_FIELD_VALUE') {
                return res.status(400).json({ message: 'The image data is too large. Please use a smaller image.' });
            }
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred
            return res.status(400).json({ message: err.message });
        }
        // Everything went fine
        next();
    });
};

module.exports = { handleProfilePictureUpload, handleCourseImageUpload }; 