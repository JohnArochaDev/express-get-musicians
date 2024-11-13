const express = require('express');
const Musician = require('../models/Musician');
const { check, validationResult } = require('express-validator')

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

musicianRoute.post('/', [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let newMusician = req.body
        const musician = await Musician.create(newMusician)
        res.status(201).json(musician)
    }
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