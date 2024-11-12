const express = require('express');
const Musician = require('../models/Musician');

const musicianRoute = express.Router();

musicianRoute.get('/:id', async (req, res) => {
    let id = req.params.id
    let musician = await Musician.findByPk(id)
    res.status(200).json(musician)
})

musicianRoute.get('/', async (req, res) => {
    let musicians = await Musician.findAll({})
    res.status(200).json(musicians)
})

musicianRoute.post('/', async (req, res) => {
    let newMusician = req.body
    const musician = await Musician.create(newMusician)
    res.status(201).json(musician)
});

musicianRoute.put('/:id', async (req, res) => {
    let id = req.params.id
    let updatedMusician = req.body
    await Musician.update(updatedMusician, {where: {id:id}})
    const musician = await Musician.findByPk(id);
    res.status(200).json(musician);
});

musicianRoute.delete('/:id', async (req, res) => {
    let id = req.params.id
    const deleted = await Musician.destroy({
        where: { id: id }
    });
    res.status(200).json(deleted)
})

module.exports = musicianRoute