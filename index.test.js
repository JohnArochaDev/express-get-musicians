const { execSync } = require('child_process')
execSync('npm install')
execSync('npm run seed')

const request = require("supertest")
const { db } = require('./db/connection')
const { Musician } = require('./models/index')
const app = require('./src/app')
const {seedMusician} = require("./seedData")

describe('./musicians endpoint', () => {
    // Write your tests here
    test('expect the data to return status code 200', async () => {
        const response = await request(app).get('/musicians')
        expect(response.statusCode).toBe(200)
    })

    test('expect status code 200', async () => {
        const response = await request(app).get('/musicians/1')
        expect(response.statusCode).toBe(200)
    })

    test('expect status code 200', async () => {
        const response = await request(app).put('/musicians/1')
        expect(response.statusCode).toBe(200)
    })

    test('expect status code 200', async () => {
        const response = await request(app).delete('/musicians/1')
        expect(response.statusCode).toBe(200)
    })

    test('should return errors array when "name" field is empty', async () => {
        const response = await request(app)
            .post('/musicians')
            .send({ instrument: 'Guitar' })
    
        expect(response.statusCode).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    test('should return errors array when "instrument" field is empty', async () => {
        const response = await request(app)
            .post('/musicians')
            .send({ name: 'John Doe' })

        expect(response.statusCode).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})
