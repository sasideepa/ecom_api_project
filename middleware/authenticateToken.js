const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	// <Bearer TOKEN> will be the format of header. hence we split it up to get token
	const token = authHeader && authHeader.split(' ')[1]; 

	if (token == null) return res.sendStatus(401); // No token present

	jwt.verify(token, 'my_api_jwt_sasideepa_secret', (err, user) => {
		
		if (err) return res.sendStatus(403); // Token not valid
		req.user = user;
		next();
	});
};

module.exports = authenticateToken;
