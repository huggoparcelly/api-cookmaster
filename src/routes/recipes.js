const router = require('express').Router();
const middlewares = require('../middlewares');
const upload = require('../middlewares/upload');

const { 
  createRecipe, 
  getRecipes, 
  getRecipeById, 
  updateRecipe,
  addImage,
  deleteRecipe,
} = require('../controllers/recipesController');

router.post('/', middlewares.validateJWT, createRecipe);
router.get('/', getRecipes);

router.get('/:id', getRecipeById);
router.put('/:id', middlewares.validateJWT, updateRecipe);
router.delete('/:id', middlewares.validateJWT, deleteRecipe);

router.put('/:id/image', middlewares.validateJWT, upload, addImage);

module.exports = router;