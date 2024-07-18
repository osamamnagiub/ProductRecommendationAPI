const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { products, users } = require('../data/inMemoryDatabase');

const productSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    brand: Joi.string().required()
});

router.get('/', (req, res) => {
    res.json(products);
});

router.post('/', (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const product = { id: uuidv4(), ...req.body };
    products.push(product);
    res.status(201).json(product);
});

router.get('/recommendations/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const recommendedProducts = products
        .map(product => {
            let relevance = 0;
            if (user.preferences.subCategories.includes(product.subCategory)) {
                relevance += 2;
            }
            if (user.preferences.brands.includes(product.brand)) {
                relevance += 1;
            }
            if (user.purchaseHistory.some(purchase => purchase.productId === product.id)) {
                relevance += 3;
            }
            return { ...product, relevance };
        })
        .filter(product => product.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance);

    res.json(recommendedProducts);
});

module.exports = router;
