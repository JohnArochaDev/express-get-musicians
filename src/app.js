const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const musicianRoute = require('../routes/musicians');

//TODO: Create a GET /musicians route to return all musicians 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/musicians', musicianRoute);

module.exports = app;