const db = require('../db');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

	try {
		// Check if user already exists
		const userExists = await db.query('SELECT * FROM api_users WHERE email = $1', [email]);
		if (userExists.rows.length > 0) {
			return res.status(400).send('Email already in use.');
		}

		// Insert the new user into the database
		await db.query('INSERT INTO api_users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
		res.status(201).send('User registered successfully.');
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).send('Server error occurred');
	}
};

const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const { rows } = await db.query('SELECT * FROM api_users WHERE email = $1', [email]);
		if (rows.length === 0) {
			return res.status(400).send('Invalid credentials.');
		}

		const user = rows[0];
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send('Invalid credentials.');
		}

		// Hard coding the JWT token since this is just a sample project and no actual use anywhere
		const token = jwt.sign({ user_id: user.user_id }, 'my_api_jwt_sasideepa_secret', { expiresIn: '1h' });
		res.status(200).json({ token });
	} catch (error) {
		console.error('Error logging in user:', error);
		res.status(500).send('Server error occurred');
	}
};

module.exports = {
	registerUser,
	loginUser,
};
