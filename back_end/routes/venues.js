var express = require('express');
var router = express.Router();

var venueController = require('../controllers/venue-controller');
var userController = require('../controllers/user-controller');
var auth = require('../controllers/auth');

router.get('/', venueController.index);
router.get('/byid/:id', auth.verifyToken, venueController.getById);
router.get('/tokencheck', auth.verifyToken, userController.tokenCheck);
router.post('/', venueController.createNewVenue);
router.delete('/byid/:id', auth.verifyToken, venueController.destroy)


module.exports = router;