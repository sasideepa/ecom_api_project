const express = require('express');
const db = require('./db');
const TABLES = require('./tables');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes'); 
const productRoutes = require('./routes/productRoutes');
const PORT = process.env.PORT || 3000;

// Test root path. can be used to test if application is running
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Test db. can be used to check if db connection is working as expected
app.get('/test_db', async (req, res) => {
	try {
		const queryText = `SELECT * FROM ${TABLES.CATEGORIES_TABLE}`;
		const { rows } = await db.query(queryText);
		let categoriesString = rows.map(category => `ID: ${category.name}, Email: ${category.description}`).join('; ');
		res.send(categoriesString);
	} catch (error) {
		console.error('Error querying the database', error);
		res.status(500).send('Failed to fetch users');
	}
});

// --------- Application code starts here ---------------

app.use(express.json());

app.use('/api/categories', categoryRoutes);

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});