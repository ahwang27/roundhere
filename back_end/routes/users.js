var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller');
var auth = require('../controllers/auth');

router.get('/', auth.verifyToken, userController.index);
router.get('/byid/:id', auth.verifyToken, userController.getById);
router.get('/tokencheck', auth.verifyToken, userController.tokenCheck);
router.post('/login', userController.login);
router.post('/register', userController.createNewUser);
router.delete('/byid/:id', auth.verifyToken, userController.destroy)


module.exports = router;