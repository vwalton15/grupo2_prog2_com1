var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const contactController = require('../controllers/contactController');
const searchController = require('../controllers/searchController.js');

router.get('/', homeController.index);
router.get('/about', aboutController.index);
router.get('/contact', contactController.index);
router.get('/search-results', searchController.resultados);

module.exports = router;
