const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const sweetRoutes = require('../routes/sweetRoutes');
const Sweet = require('../models/Sweet');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

afterEach(async () => {
    await Sweet.deleteMany();
});

describe('Sweet Shop APIs', () => {

    it('should add a sweet', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .send({ name: 'Ladoo', category: 'sweet', price: 200, quantity: 10 });
        
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Ladoo');
    });

    it('should get all sweets', async () => {
        await Sweet.create({ name: 'Jalebi', category: 'sweet', price: 150, quantity: 20 });

        const res = await request(app).get('/api/sweets');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it('should update a sweet', async () => {
        const sweet = await Sweet.create({ name: 'Kaju Katli', category: 'sweet', price: 800, quantity: 5 });

        const res = await request(app)
            .put(`/api/sweets/${sweet._id}`)
            .send({ price: 900 });

        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(900);
    });

    it('should delete a sweet', async () => {
        const sweet = await Sweet.create({ name: 'Barfi', category: 'sweet', price: 500, quantity: 3 });

        const res = await request(app).delete(`/api/sweets/${sweet._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Sweet deleted successfully');
    });

    it('should restock a sweet', async () => {
        const sweet = await Sweet.create({ name: 'Gulab Jamun', category: 'sweet', price: 300, quantity: 5 });

        const res = await request(app)
            .put(`/api/sweets/restock/${sweet._id}`)
            .send({ quantity: 10 });

        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(15);
    });

    it('should purchase a sweet', async () => {
        const sweet = await Sweet.create({ name: 'Rasgulla', category: 'sweet', price: 250, quantity: 5 });

        const res = await request(app)
            .put(`/api/sweets/purchase/${sweet._id}`)
            .send({ quantity: 2 });

        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(3);
    });

    it('should search and sort sweets', async () => {
    await Sweet.insertMany([
        { name: 'Belgium Waffle', category: 'waffle', price: 500, quantity: 5 },
        { name: 'Maxican Waffle', category: 'waffle', price: 200, quantity: 15 },
        { name: 'Jalebi', category: 'sweet', price: 300, quantity: 10 }
    ]);

    const res = await request(app).get('/api/sweets')
        .query({ category: 'Waffle', sortBy: 'price', sortOrder: 'asc' });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe('Belgium Waffle');
    expect(res.body[1].name).toBe('Maxican Waffle');
});

});
