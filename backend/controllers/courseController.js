const Course = require('../models/Course');
const Payment = require('../models/Payment');
const User = require('../models/User');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Create a new course (admin only)
const createCourse = async (req, res) => {
    try {
        // First check if the user is an admin
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Only admins can create courses.' });
        }

        const { title, description, price, hours, category, instructor } = req.body;

        // Validate required fields
        if (!title || !description || price === undefined || !hours || !category || !instructor) {
            return res.status(400).json({ message: 'Please provide all required course information.' });
        }

        // Create URL slug from title
        const url = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        // Check if a course with this URL already exists
        const existingCourse = await Course.findOne({ url });
        if (existingCourse) {
            return res.status(400).json({ message: 'A course with this title already exists.' });
        }

        // Handle image upload
        let imgFileName = 'default-course.jpg'; // Default image

        if (req.file) {
            // If using memory storage, we need to save the buffer to a file
            const fileExtension = req.file.mimetype.split('/')[1];
            imgFileName = `${url}-${Date.now()}.${fileExtension}`;

            // Create public/images directory if it doesn't exist
            const imagesDir = path.join(__dirname, '../../frontend/public/images');
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
            }

            // Write the file
            fs.writeFileSync(path.join(imagesDir, imgFileName), req.file.buffer);
        }

        // Create the course
        const newCourse = new Course({
            title,
            url,
            description,
            price: parseFloat(price),
            hours: parseFloat(hours),
            category,
            instructor,
            img: imgFileName,
            rating: 0,
            enrolledCount: 0,
            content: []
        });

        await newCourse.save();

        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse
        });

    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Get course by URL
const getCourseByUrl = async (req, res) => {
    try {
        const url = req.params.url;
        const course = await Course.findOne({ url });

        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

// Enroll in a free course
const enrollFreeCourse = async (req, res) => {
    try {
        const userId = req.user.userId;
        const courseId = req.params.courseId;

        // Validate courseId
        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ message: 'Invalid course ID.' });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Check if the course is free
        if (course.price > 0) {
            return res.status(400).json({
                message: 'This is not a free course. Please proceed to payment.',
                isPaid: true,
                price: course.price
            });
        }

        // Check if user is already enrolled
        let payment = await Payment.findOne({ user: userId });

        if (payment) {
            const alreadyEnrolled = payment.transactions.some(t =>
                t.courseId.toString() === courseId && t.status === 'completed'
            );

            if (alreadyEnrolled) {
                return res.status(400).json({ message: 'You are already enrolled in this course.' });
            }
        }

        // Create new payment record if user doesn't have one
        if (!payment) {
            payment = new Payment({
                user: userId,
                paymentMethods: [],
                transactions: [],
                totalSpent: 0
            });
        }

        // Create a free enrollment transaction
        const transaction = {
            courseId: new mongoose.Types.ObjectId(courseId),
            amount: 0,
            description: course.title,
            status: 'completed',
            paymentMethod: 'free_enrollment',
            progress: 0,
            courseUrl: course.url,
            hours: course.hours || 0,
            img: course.img || 'default-course.jpg'
        };

        // Add the transaction
        payment.transactions.push(transaction);

        // Increment enrolled count on the course
        course.enrolledCount = (course.enrolledCount || 0) + 1;

        // Save both records
        await Promise.all([payment.save(), course.save()]);

        res.status(200).json({
            message: 'You have successfully enrolled in this course.',
            transaction
        });

    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseByUrl,
    enrollFreeCourse
}; 