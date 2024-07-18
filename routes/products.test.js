const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./products');
const userRoutes = require('./users');
const { products, users } = require('../data/inMemoryDatabase');

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

beforeEach(() => {
    products = [];
    users = [];
});

describe('Product Routes', () => {
    it('should add a new product', async () => {
        const newProduct = {
            name: "Breadfast Classic Millefeuille Cup",
            category: "Bakeries & Pastries",
            subCategory: "Millefeuille & Profiterole",
            brand: "Breadfast"
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct)
            .expect(201);

        expect(response.body).toMatchObject(newProduct);
        expect(products).toHaveLength(1);
    });

    it('should get product recommendations', async () => {
        const user = {
            id: 'user1',
            name: 'Ahmed',
            email: 'ahmed@example.com',
            preferences: {
                subCategories: ['Millefeuille & Profiterole'],
                brands: ['Breadfast']
            },
            purchaseHistory: []
        };
        users.push(user);

        const product1 = {
            id: 'product1',
            name: "Breadfast Classic Millefeuille Cup",
            category: "Bakeries & Pastries",
            subCategory: "Millefeuille & Profiterole",
            brand: "Breadfast",
            relevance: 3
        };
        const product2 = {
            id: 'product2',
            name: "Breadfast Profiterole",
            category: "Bakeries & Pastries",
            subCategory: "Profiterole",
            brand: "Breadfast",
            relevance: 1
        };
        products.push(product1, product2);

        const response = await request(app)
            .get('/api/products/recommendations/user1')
            .expect(200);

        expect(response.body).toEqual([product1, product2]);
    });
});

describe('User Routes', () => {
    it('should add a new user', async () => {
        const newUser = {
            name: 'Ahmed',
            email: 'ahmed@example.com',
            preferences: {
                subCategories: ['Millefeuille & Profiterole'],
                brands: ['Breadfast']
            },
            purchaseHistory: []
        };

        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);

        expect(response.body).toMatchObject(newUser);
        expect(users).toHaveLength(1);
    });

    it('should get a user by ID', async () => {
        const user = {
            id: 'user1',
            name: 'Ahmed',
            email: 'ahmed@example.com',
            preferences: {
                subCategories: ['Millefeuille & Profiterole'],
                brands: ['Breadfast']
            },
            purchaseHistory: []
        };
        users.push(user);

        const response = await request(app)
            .get('/api/users/user1')
            .expect(200);

        expect(response.body).toEqual(user);
    });
});
