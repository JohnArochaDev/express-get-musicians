const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");

describe('./musicians endpoint', () => {
    // Write your tests here
    test('expect the data to return status code 200', async () => {
        const response = await request(app).get('/musicians')
        expect(response.statusCode).toBe(200)
    })

    // Ask about this
    
    // test('expect the data to return correct data', async () => {
    //     const response = await request(app).get('/musicians')
    //     const responseData = JSON.parse(response.text)
    //     let dbData = await Musician.findAll({})

    //     console.log(responseData[0])
    //     console.log(dbData)
    //     expect(dbData.includes(responseData[0])).toEqual(true)
    // })

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
})
