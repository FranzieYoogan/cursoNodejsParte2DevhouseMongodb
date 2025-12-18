const {Router} = require('express');
const routes = Router();
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.store);

module.exports = routes;