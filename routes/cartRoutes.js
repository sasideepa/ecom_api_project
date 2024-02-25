const express = require('express');
const router = express.Router();
const { addItemToCart, viewCart, removeItemFromCart } = require('../controllers/cart');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/add', authenticateToken, addItemToCart);
router.get('/view', authenticateToken, viewCart);
router.delete('/remove/:itemId', authenticateToken, removeItemFromCart);

module.exports = router;
