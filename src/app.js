const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get('/musicians/:id', async (req, res) => {
    let id = req.params.id
    let musician = await Musician.findByPk(id)
    res.json(musician)
})

app.get('/musicians', async (req, res) => {
    let musicians = await Musician.findAll({})
    res.status(200).json(musicians)
})

module.exports = app;