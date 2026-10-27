const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');

router.get('/', categoryController.getCategories);
router.post('/', authenticate, authorizeAdmin, categoryController.createCategory);

module.exports = router;
