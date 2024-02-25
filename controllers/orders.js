const db = require('../db');

const placeOrder = async (req, res) => {
	const userId = req.user.user_id;

	try {
		// Begin transaction
		await db.query('BEGIN');

		// Fetch cart items for the user by joining api_cart_items with api_carts
		const cartItemsResult = await db.query(
			'SELECT ci.product_id, ci.quantity, p.price ' +
			'FROM api_cart_items ci ' +
			'JOIN api_carts c ON ci.cart_id = c.cart_id ' +
			'JOIN api_products p ON ci.product_id = p.product_id ' +
			'WHERE c.user_id = $1',
			[userId]
		);
		const cartItems = cartItemsResult.rows;

		if (cartItems.length === 0) {
			await db.query('ROLLBACK');
			return res.status(400).send('Cart is empty.');
		}

		// Calculate total price
		const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

		// Insert a new order and retrieve its ID
		const orderResult = await db.query(
			'INSERT INTO api_orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING order_id',
			[userId, totalPrice, 'Placed']
		);
		const orderId = orderResult.rows[0].order_id;

		// Transfer items from cart to order_items and clear the cart
		for (const item of cartItems) {
			await db.query(
				'INSERT INTO api_order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
				[orderId, item.product_id, item.quantity, item.price]
			);
		}

		// Clear the user's cart
		await db.query('DELETE FROM api_cart_items WHERE cart_id IN (SELECT cart_id FROM api_carts WHERE user_id = $1)', [userId]);

		// Commit transaction
		await db.query('COMMIT');

		res.status(201).json({ message: 'Order placed successfully', orderId });
	} catch (error) {
		// Rollback in case of error
		await db.query('ROLLBACK');
		console.error('Error placing order:', error);
		res.status(500).send('Server error occurred');
	}
};

// View order history
const viewOrderHistory = async (req, res) => {
	const userId = req.user.user_id;

	try {
		const { rows } = await db.query('SELECT * FROM api_orders WHERE user_id = $1 ORDER BY placed_at DESC', [userId]);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching order history:', error);
		res.status(500).send('Server error occurred');
	}
};

// Get order details
const getOrderDetails = async (req, res) => {
	const userId = req.user.user_id;
	const { orderId } = req.params;

	try {
		const orderResult = await db.query('SELECT * FROM api_orders WHERE order_id = $1 AND user_id = $2', [orderId, userId]);
		if (orderResult.rows.length === 0) {
			return res.status(404).send('Order not found or does not belong to the user.');
		}

		const itemsResult = await db.query('SELECT * FROM api_order_items WHERE order_id = $1', [orderId]);
		res.json({ order: orderResult.rows[0], items: itemsResult.rows });
	} catch (error) {
		console.error('Error fetching order details:', error);
		res.status(500).send('Server error occurred');
	}
};

module.exports = { placeOrder, viewOrderHistory, getOrderDetails };
