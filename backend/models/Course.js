const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            default: 0
        },
        hours: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        img: {
            type: String,
            default: "default-course.jpg"
        },
        instructor: {
            type: String,
            required: true
        },
        enrolledCount: {
            type: Number,
            default: 0
        },
        content: {
            type: [
                {
                    title: String,
                    description: String,
                    videoUrl: String,
                    duration: Number,
                    materials: [String]
                }
            ],
            default: []
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);