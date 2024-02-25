const express = require('express');
const router = express.Router();
const { placeOrder, viewOrderHistory, getOrderDetails } = require('../controllers/orders');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, placeOrder);
router.get('/history', authenticateToken, viewOrderHistory);
router.get('/:orderId', authenticateToken, getOrderDetails);

module.exports = router;
