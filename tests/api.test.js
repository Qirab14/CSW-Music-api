const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
    // Login to get a token
    const res = await request(app).post('/login').send({});
    token = res.body.token;
});

afterAll(async () => {
    // Close the MongoDB connection
    await mongoose.connection.close();
});

describe('Artist API', () => {
    it('should create a new artist', async () => {
        const res = await request(app)
            .post('/api/artists')
            .set('Authorization', token)
            .send({ name: 'Artist 1', genre: 'Rock' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toBe('Artist 1');
    }, 30000); // Increase timeout for this test

    it('should get all artists', async () => {
        const res = await request(app)
            .get('/api/artists')
            .set('Authorization', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    }, 30000); // Increase timeout for this test
});