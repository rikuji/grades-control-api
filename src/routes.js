const express = require('express');
const GradeController = require('./controllers/GradeController');

const routes = express.Router();

routes.post('/v1/grade', GradeController.create);

module.exports = routes;
