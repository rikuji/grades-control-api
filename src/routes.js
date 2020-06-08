const express = require('express');
const GradeController = require('./controllers/GradeController');

const routes = express.Router();

routes.post('/v1/grade', GradeController.create);
routes.put('/v1/grade/:id', GradeController.update);
routes.delete('/v1/grade/:id', GradeController.delete);

module.exports = routes;
