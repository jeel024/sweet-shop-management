const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const sweetRoutes = require('../routes/sweetRoutes');
const Sweet = require('../models/Sweet');

const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoutes);

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://jeel:jeel@cluster0.px2pswk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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

});
