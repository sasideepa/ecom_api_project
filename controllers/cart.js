const db = require('../db');
const bcrypt = require('bcryptjs');

const addItemToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	// We will get user's ID from JWT authentication
	const userId = req.user.user_id;

	try {
		// First, find or create a cart for the user
		let { rows } = await db.query('SELECT cart_id FROM api_carts WHERE user_id = $1', [userId]);
		let cartId;

		if (rows.length === 0) {
			// If the user doesn't have a cart, create one
			const newCart = await db.query('INSERT INTO api_carts (user_id) VALUES ($1) RETURNING cart_id', [userId]);
			cartId = newCart.rows[0].cart_id;
		} else {
			// Use the existing cart
			cartId = rows[0].cart_id;
		}

		// Then, insert the new item into the user's cart
		await db.query('INSERT INTO api_cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cartId, productId, quantity]);

		res.status(201).json({ message: 'Item added to cart successfully.' });
	} catch (error) {
		console.error('Error adding item to cart:', error);
		res.status(500).send('Server error occurred');
	}
};

const viewCart = async (req, res) => {
	const userId = req.user.user_id;

	try {
		const { rows } = await db.query(
			'SELECT ci.item_id, ci.product_id, ci.quantity, ci.added_at, p.title, p.price ' +
			'FROM api_cart_items ci ' +
			'JOIN api_carts c ON ci.cart_id = c.cart_id ' +
			'JOIN api_products p ON ci.product_id = p.product_id ' +
			'WHERE c.user_id = $1', [userId]);

		res.json(rows);
	} catch (error) {
		console.error('Error viewing cart:', error);
		res.status(500).send('Server error occurred');
	}
};

const removeItemFromCart = async (req, res) => {
	const { itemId } = req.params;
	const userId = req.user.user_id;

	try {
		// Ensure the item belongs to the user's cart before attempting to delete
		const deleteResponse = await db.query(
			'DELETE FROM api_cart_items ci USING api_carts c ' +
			'WHERE ci.item_id = $1 AND ci.cart_id = c.cart_id AND c.user_id = $2', [itemId, userId]);

		if (deleteResponse.rowCount === 0) {
			// No rows deleted, indicating the item did not belong to the user's cart
			return res.status(404).send('Item not found in cart.');
		}

		res.json({ message: 'Item removed from cart successfully.' });
	} catch (error) {
		console.error('Error removing item from cart:', error);
		res.status(500).send('Server error occurred');
	}
};

module.exports = { addItemToCart, viewCart, removeItemFromCart };
