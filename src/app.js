const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json())
app.use(express.urlencoded())

app.get('/musicians/:id', async (req, res) => {
    let id = req.params.id
    let musician = await Musician.findByPk(id)
    res.status(200).json(musician)
})

app.get('/musicians', async (req, res) => {
    let musicians = await Musician.findAll({})
    res.status(200).json(musicians)
})

app.post('/musicians', async (req, res) => {
    let newMusician = req.body
    const musician = await Musician.create(newMusician)
    res.status(201).json(musician)
});

app.put('/musicians/:id', async (req, res) => {
    let id = req.params.id
    let updatedMusician = req.body
    await Musician.update(updatedMusician, {where: {id:id}})
    const musician = await Musician.findByPk(id);
    res.status(200).json(musician);
});

app.delete('/musicians/:id', async (req, res) => {
    let id = req.params.id
    const deleted = await Musician.destroy({
        where: { id: id }
    });
    res.status(200).json(deleted)
})

module.exports = app;