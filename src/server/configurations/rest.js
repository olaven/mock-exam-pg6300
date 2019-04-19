const { code } = require("../../shared/http");
const authApi = require("../routes/auth-api");
const dishApi = require("../routes/dish-api");

const configureREST = (app) => {

	app.use("/api", authApi);
	app.use("/api", dishApi);
	app.all("/api*", (req, res) => {
		console.log(req.url, " not found..."); 
		res.status(code.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};