const express = require('express');
const path = require('path');
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

app.use('/users', routes.users);
app.use('/login', routes.login);
app.use('/recipes', routes.recipes);

/**
  feito com ajuda
 * fontes: 
 * https://qastack.com.br/programming/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
 * https://devpleno.com/multer-upload-de-imagens-com-nodejs-e-express
 *  */ 

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(middlewares.error);

module.exports = app;
