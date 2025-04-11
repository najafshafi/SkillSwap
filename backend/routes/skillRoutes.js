const express = require('express');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Skill
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const skill = new Skill({
            name,
            instructor: req.user.id,
            description,
            price
        });

        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().populate('instructor', 'name');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
