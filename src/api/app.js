const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const middlewares = require('../middlewares');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', routes.createUsers);

app.use(middlewares.error);

module.exports = app;
