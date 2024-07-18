const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { users } = require('../data/inMemoryDatabase');

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    preferences: Joi.object({
        subCategories: Joi.array().items(Joi.string()).required(),
        brands: Joi.array().items(Joi.string()).required()
    }).required(),
    purchaseHistory: Joi.array().items(Joi.object({
        productId: Joi.string().required(),
        date: Joi.string().isoDate().required()
    })).required()
});

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/', (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const user = { id: uuidv4(), ...req.body };
    users.push(user);
    res.status(201).json(user);
});

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

module.exports = router;
