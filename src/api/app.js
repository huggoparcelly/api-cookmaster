const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const routes = require('./routes');
const middlewares = require('../middlewares');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.static(`${__dirname}/src/uploads`));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.post('/users', routes.createUsers);
app.post('/login', routes.login);

app.post('/recipes', middlewares.validateJWT, routes.createRecipe);
app.get('/recipes', routes.getRecipes);
app.get('/recipes/:id', routes.getRecipesById);
app.put('/recipes/:id', middlewares.validateJWT, routes.updateRecipe);
app.delete('/recipes/:id', middlewares.validateJWT, routes.deleteRecipe);
app.put('/recipes/:id/image', middlewares.validateJWT, upload.single('image'), routes.updateImg);

app.use(middlewares.error);

module.exports = app;
