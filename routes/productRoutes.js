const express = require('express');
const router = express.Router();
const { getProducts, getProductDetails } = require('../controllers/products');

// Route to get all products or by category
router.get('/', getProducts);

// Route to get product details by ID
router.get('/:productId', getProductDetails);

module.exports = router;
