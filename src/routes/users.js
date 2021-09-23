const router = require('express').Router();

const createUsers = require('../controllers/createUser');
const createAdmin = require('../controllers/createAdmin');

router.post('/', createUsers);
router.post('/admin', createAdmin);

module.exports = router;
