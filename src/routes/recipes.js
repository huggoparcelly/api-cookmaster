const router = require('express').Router();
const middlewares = require('../middlewares');
const upload = require('../middlewares/upload');

const createRecipe = require('../controllers/createRecipe');
const getRecipes = require('../controllers/getRecipes');
const getRecipesById = require('../controllers/getRecipesById');
const updateRecipe = require('../controllers/updateRecipe');
const deleteRecipe = require('../controllers/deleteRecipe');
const updateImg = require('../controllers/updateImg');
// const getImg = require('../controllers/getImg');

router.post('/', middlewares.validateJWT, createRecipe);
router.get('/', getRecipes);

router.get('/:id', getRecipesById);
router.put('/:id', middlewares.validateJWT, updateRecipe);
router.delete('/:id', middlewares.validateJWT, deleteRecipe);

router.put('/:id/image', middlewares.validateJWT, upload, updateImg);

// router.get('/images/:id', getImg);

module.exports = router;