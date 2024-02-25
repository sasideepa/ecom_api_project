const db = require('../db');

// Function to get all products or by category if category ID is provided
const getProducts = async (req, res) => {
	const categoryId = req.query.categoryId;
	let queryText = 'SELECT * FROM api_products';

	if (categoryId) {
		queryText += ' WHERE category_id = $1';
	}

	try {
		const { rows } = await db.query(queryText, categoryId ? [categoryId] : undefined);
		res.status(200).json(rows);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).send('Server error occurred');
	}
};

// Function to get a single product by ID
const getProductDetails = async (req, res) => {
	const { productId } = req.params;
	const queryText = 'SELECT * FROM api_products WHERE product_id = $1';

	try {
		const { rows } = await db.query(queryText, [productId]);
		if (rows.length) {
			res.status(200).json(rows[0]);
		} else {
			res.status(404).send('Product not found');
		}
	} catch (error) {
		console.error('Error fetching product details:', error);
		res.status(500).send('Server error occurred');
	}
};

module.exports = {
	getProducts,
	getProductDetails,
};
