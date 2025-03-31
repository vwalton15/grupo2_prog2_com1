var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const contactController = require('../controllers/contactController');


router.get('/', homeController.index);
router.get('/about', aboutController.index);
router.get('/contact', contactController.index);

module.exports = router;
