const express = require('express');
const db = require('./db');
const TABLES = require('./tables');
const app = express();
const PORT = process.env.PORT || 3000;

// Test root path. can be used to test if application is running
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Test db. can be used to check if db connection is working as expected
app.get('/test_db', async (req, res) => {
	try {
		const queryText = `SELECT * FROM ${TABLES.USERS_TABLE}`;
		const { rows } = await db.query(queryText);
		let usersString = rows.map(user => `ID: ${user.user_id}, Email: ${user.email}`).join('; ');
		res.send(usersString);
	} catch (error) {
		console.error('Error querying the database', error);
		res.status(500).send('Failed to fetch users');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});