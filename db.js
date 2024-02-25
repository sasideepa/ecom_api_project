const { Pool } = require('pg');

const pool = new Pool({
	user: 'myname',
	host: 'localhost',
	database: 'api_project_db',
	password: 'api_pass',
	port: 5432,
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
