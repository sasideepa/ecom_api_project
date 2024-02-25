const db = require('../db'); 

// Function to get all categories
const getAllCategories = async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM api_categories');
		res.status(200).json(rows);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).send('Server error occurred');
	}
};

module.exports = {
	getAllCategories,
};
