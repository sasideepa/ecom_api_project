const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../controllers/categories'); 

// Route to get all categories
router.get('/', getAllCategories);

module.exports = router;
