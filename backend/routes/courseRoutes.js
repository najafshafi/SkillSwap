const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    getCourseByUrl,
    enrollFreeCourse
} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const { handleCourseImageUpload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/:url', getCourseByUrl);

// Protected routes
router.use(authMiddleware);
router.post('/create', handleCourseImageUpload, createCourse);
router.post('/:courseId/enroll', enrollFreeCourse);

module.exports = router; 