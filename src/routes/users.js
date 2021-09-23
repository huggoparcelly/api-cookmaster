const router = require('express').Router();

const { createAdmin, createUser } = require('../controllers/usersController');

router.post('/', createUser);
router.post('/admin', createAdmin);

module.exports = router;
