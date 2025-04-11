const express = require("express");
const router = express.Router();
const {
    getPaymentData,
    addPaymentMethod,
    removePaymentMethod,
    processCoursePayment,
    getTransactionHistory,
    getEnrolledCourses,
    updateCourseProgress,
    getAllTransactions
} = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

// All payment routes require authentication
router.use(authMiddleware);

// Get user payment data (methods and recent transactions)
router.get("/data", getPaymentData);

// Payment methods operations
router.post("/methods", addPaymentMethod);
router.delete("/methods/:paymentMethodId", removePaymentMethod);

// Transaction operations
router.post("/process", processCoursePayment);
router.get("/transactions", getTransactionHistory);
router.get("/all-transactions", getAllTransactions);

// Enrolled courses operations
router.get("/enrolled-courses", getEnrolledCourses);
router.put("/course-progress/:courseId", updateCourseProgress);

module.exports = router; 