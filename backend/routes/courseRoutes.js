const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    getCourseByUrl,
    updateCourse,
    deleteCourse,
    getAdminCourses,
    enrollFreeCourse
} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const { handleCourseImageUpload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getAllCourses);

// Debugging routes (must come before parameter routes)
router.get('/admin-test', (req, res) => {
    res.json({ message: 'Admin test route works!' });
});

router.get('/debug/:param', (req, res) => {
    res.json({
        message: 'Debug route works!',
        param: req.params.param
    });
});

// Create admin sub-router
const adminRouter = express.Router();
router.use('/admin', authMiddleware, adminRouter);

// Admin routes
adminRouter.get('/courses', getAdminCourses);
adminRouter.post('/create', handleCourseImageUpload, createCourse);
adminRouter.put('/course/:id', handleCourseImageUpload, updateCourse);
adminRouter.delete('/course/:id', deleteCourse);

// Regular course routes with auth
router.post('/create', authMiddleware, handleCourseImageUpload, createCourse);
router.put('/:id', authMiddleware, handleCourseImageUpload, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);
router.post('/:courseId/enroll', authMiddleware, enrollFreeCourse);

// Must be last - catches all other GET requests
router.get('/:url', getCourseByUrl);

module.exports = router; 