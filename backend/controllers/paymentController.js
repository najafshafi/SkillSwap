const Payment = require("../models/Payment");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Get enrolled courses
const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find the user's payment record
        const payment = await Payment.findOne({ user: userId });

        if (!payment || !payment.transactions || payment.transactions.length === 0) {
            return res.status(200).json([]);
        }

        // Get all completed transactions (enrolled courses)
        const enrolledCourses = payment.transactions
            .filter(transaction => transaction.status === 'completed')
            .map(transaction => {
                return {
                    id: transaction.courseId,
                    title: transaction.description,
                    progress: transaction.progress,
                    enrollmentDate: transaction.createdAt,
                    amount: transaction.amount,
                    url: transaction.courseUrl,
                    hours: transaction.hours || 0,
                    img: transaction.img || 'default-course.jpg'
                };
            });

        res.status(200).json(enrolledCourses);
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        res.status(500).json({ message: "Server error. Failed to fetch enrolled courses." });
    }
};

// Update course progress
const updateCourseProgress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const courseId = req.params.courseId;
        const { progress } = req.body;

        if (!progress || progress < 0 || progress > 100) {
            return res.status(400).json({ message: "Invalid progress value. Must be between 0 and 100." });
        }

        // Find the payment record for the user
        const payment = await Payment.findOne({ user: userId });

        if (!payment) {
            return res.status(404).json({ message: "No payment records found for this user." });
        }

        // Find the transaction for this course
        // Handle both ObjectId and numeric IDs
        const transactionIndex = payment.transactions.findIndex(t => {
            if (mongoose.Types.ObjectId.isValid(courseId) && t.courseId instanceof mongoose.Types.ObjectId) {
                // Compare ObjectId to ObjectId
                return t.courseId.toString() === courseId && t.status === 'completed';
            } else {
                // Compare as strings or numbers
                return t.courseId == courseId && t.status === 'completed';
            }
        });

        if (transactionIndex === -1) {
            return res.status(404).json({ message: "You are not enrolled in this course." });
        }

        // Update the progress
        payment.transactions[transactionIndex].progress = progress;
        await payment.save();

        res.status(200).json({ message: "Progress updated successfully", progress });
    } catch (error) {
        console.error("Error updating course progress:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Process a course payment
const processCoursePayment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { courseId, courseName, amount, date, paymentDetails, hours, img } = req.body;

        // Validate required fields
        if (!courseId || !courseName || !amount) {
            return res.status(400).json({
                message: "Missing required payment information. Please provide course and payment details."
            });
        }

        // For demo courses (with numeric IDs), we don't need to validate against the database
        let courseUrl = '';
        let course = null;
        let courseHours = hours || 0;
        let courseImg = img || "default-course.jpg";

        // Check if the ID is a valid MongoDB ObjectID
        const isValidObjectId = mongoose.isValidObjectId(courseId);

        if (isValidObjectId) {
            // If it's a valid ObjectID, try to find the course in the database
            course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    message: "Course not found. This course may no longer be available."
                });
            }
            courseUrl = course.url || '';
            courseHours = course.hours || 0;
            courseImg = course.img || "default-course.jpg";
        } else {
            // For demo courses with numeric IDs, construct the URL from the course name
            courseUrl = courseName.toLowerCase().replace(/\s+/g, '-');

            // For demo courses, try to match with a hardcoded course ID to get its data
            // This is just a fallback for the demo courses
            if (!courseHours || !courseImg || !courseUrl) {
                // Try to find the demo course in the request to get more data
                const demoCoursesMap = {
                    '1': { hours: 5, img: 'logo-design.jpg', url: 'logo-designing' },
                    '2': { hours: 8, img: 'uiux-design.jpg', url: 'ui/ux-designing' },
                    '3': { hours: 10, img: 'motion-graphics.jpg', url: 'motion-graphics' },
                    '4': { hours: 12, img: 'web-development.jpg', url: 'web-development' },
                    '5': { hours: 15, img: 'mobile-app.jpg', url: 'mobile-app-development' },
                    '6': { hours: 20, img: 'game-development.jpg', url: 'game-development' },
                    '7': { hours: 18, img: 'data-science.jpg', url: 'data-science' },
                    '8': { hours: 14, img: 'big-data.jpg', url: 'big-data' },
                    '9': { hours: 20, img: 'machine-learning.jpg', url: 'machine-learning' },
                    '10': { hours: 22, img: 'ethical-hacking.jpg', url: 'ethical-hacking' },
                    '11': { hours: 18, img: 'network-security.jpg', url: 'network-security' },
                    '12': { hours: 16, img: 'cloud-security.jpg', url: 'cloud-security' },
                    '13': { hours: 6, img: 'seo.jpg', url: 'seo' },
                    '14': { hours: 10, img: 'smm.jpg', url: 'social-media-marketing' },
                    '15': { hours: 12, img: 'content-marketing.jpg', url: 'content-marketing' }
                };

                if (demoCoursesMap[courseId]) {
                    courseHours = demoCoursesMap[courseId].hours || 0;
                    courseImg = demoCoursesMap[courseId].img || "default-course.jpg";
                    courseUrl = demoCoursesMap[courseId].url || courseUrl; // Use exact URL from mapping
                }
            }
        }

        // Check if user has already purchased this course
        let payment = await Payment.findOne({ user: userId });

        if (payment) {
            const alreadyPurchased = payment.transactions.some(t =>
                (isValidObjectId ? t.courseId?.toString() === courseId.toString() : t.courseId == courseId) &&
                t.status === 'completed'
            );

            if (alreadyPurchased) {
                return res.status(400).json({
                    message: "You've already purchased this course. Please check your enrolled courses."
                });
            }
        }

        // Find or create a payment record for the user
        if (!payment) {
            // If no payment record exists, create one
            payment = new Payment({
                user: userId,
                paymentMethods: [],
                transactions: [],
                totalSpent: 0
            });
        }

        // Determine payment method
        let paymentMethod = 'credit_card';
        if (paymentDetails && paymentDetails.cardNumber) {
            paymentMethod = `card_ending_in_${paymentDetails.cardNumber}`;
        }

        // Create a new transaction
        const transaction = {
            courseId: isValidObjectId ? new mongoose.Types.ObjectId(courseId) : Number(courseId), // Ensure numeric IDs are stored as numbers
            amount: parseFloat(amount),
            description: courseName,
            status: 'completed',
            paymentMethod: paymentMethod,
            progress: 0,
            courseUrl: courseUrl,
            hours: courseHours,
            img: courseImg
        };

        // Add the transaction and update total spent
        payment.transactions.push(transaction);
        payment.totalSpent += parseFloat(amount);

        // Increment enrolled count on the course if it exists in the database
        if (course) {
            course.enrolledCount = (course.enrolledCount || 0) + 1;
            await course.save();
        }

        // Save the updated payment record
        await payment.save();

        res.status(200).json({
            message: "Payment processed successfully",
            transaction
        });
    } catch (error) {
        console.error("Error processing payment:", error);

        // Determine the appropriate error message
        let errorMessage = "Server error. Failed to process payment.";
        let statusCode = 500;

        // Handle specific errors
        if (error.name === 'ValidationError') {
            errorMessage = "Invalid payment data: " + error.message;
            statusCode = 400;
        } else if (error.name === 'CastError') {
            errorMessage = "Invalid data format in payment request.";
            statusCode = 400;
        } else if (error.code === 11000) {
            errorMessage = "Duplicate transaction detected. Payment may have already been processed.";
            statusCode = 409;
        }

        res.status(statusCode).json({ message: errorMessage });
    }
};

// Get payment data (methods and recent transactions)
const getPaymentData = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find payment record for user
        let payment = await Payment.findOne({ user: userId });

        if (!payment) {
            // If no payment record exists, create one with defaults
            payment = new Payment({
                user: userId,
                paymentMethods: [],
                transactions: [],
                totalSpent: 0
            });

            await payment.save();
        }

        // Sort transactions by date (most recent first)
        const recentTransactions = payment.transactions
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5); // Get most recent 5

        res.status(200).json({
            totalSpent: payment.totalSpent,
            paymentMethods: payment.paymentMethods,
            recentTransactions
        });
    } catch (error) {
        console.error("Error fetching payment data:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Add a payment method
const addPaymentMethod = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { type, lastFour, expiryDate, cardholderName } = req.body;

        if (!type || !lastFour || !expiryDate || !cardholderName) {
            return res.status(400).json({ message: "Missing required payment method information." });
        }

        // Find or create payment record for user
        let payment = await Payment.findOne({ user: userId });

        if (!payment) {
            payment = new Payment({
                user: userId,
                paymentMethods: [],
                transactions: [],
                totalSpent: 0
            });
        }

        // Create new payment method
        const newPaymentMethod = {
            type,
            lastFour,
            expiryDate,
            cardholderName,
            isDefault: payment.paymentMethods.length === 0 // Make default if first method
        };

        // Add payment method
        payment.paymentMethods.push(newPaymentMethod);

        await payment.save();

        res.status(201).json({
            message: "Payment method added successfully",
            paymentMethod: newPaymentMethod
        });
    } catch (error) {
        console.error("Error adding payment method:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Remove a payment method
const removePaymentMethod = async (req, res) => {
    try {
        const userId = req.user.userId;
        const paymentMethodId = req.params.paymentMethodId;

        // Find payment record
        const payment = await Payment.findOne({ user: userId });

        if (!payment) {
            return res.status(404).json({ message: "No payment record found." });
        }

        // Find payment method index
        const methodIndex = payment.paymentMethods.findIndex(
            method => method._id.toString() === paymentMethodId
        );

        if (methodIndex === -1) {
            return res.status(404).json({ message: "Payment method not found." });
        }

        // Check if it's the only method or if it's the default method
        const isDefault = payment.paymentMethods[methodIndex].isDefault;

        // Remove the payment method
        payment.paymentMethods.splice(methodIndex, 1);

        // If it was the default and we have other methods, set a new default
        if (isDefault && payment.paymentMethods.length > 0) {
            payment.paymentMethods[0].isDefault = true;
        }

        await payment.save();

        res.status(200).json({
            message: "Payment method removed successfully",
            paymentMethods: payment.paymentMethods
        });
    } catch (error) {
        console.error("Error removing payment method:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Get all transactions
const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find payment record
        const payment = await Payment.findOne({ user: userId });

        if (!payment) {
            return res.status(200).json([]); // Return empty array if no payment record
        }

        // Sort transactions by date (most recent first)
        const transactions = payment.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Get all transactions without limit
const getAllTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Find payment record
        const payment = await Payment.findOne({ user: userId });

        if (!payment) {
            return res.status(200).json([]); // Return empty array if no payment record
        }

        // Sort transactions by date (most recent first)
        const transactions = payment.transactions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching all transactions:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

module.exports = {
    getPaymentData,
    addPaymentMethod,
    removePaymentMethod,
    processCoursePayment,
    getTransactionHistory,
    getEnrolledCourses,
    updateCourseProgress,
    getAllTransactions
}; 