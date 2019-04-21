const { code } = require("../shared/http");
/**
 * Express middleware. 
 * Returns 401 if not authenticated
 */
const isAuthenticated = (req, res, next) => {

	if (!req.user) {

		res.status(code.UNAUTHORIZED).send();
	} else {
		next();
	}
};

module.exports = {

	isAuthenticated
};