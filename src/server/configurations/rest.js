const { code } = require("../../shared/http");
const authApi = require("../routes/auth-api");

const configureREST = (app) => {

	app.use("/api", authApi);
	app.all("/api*", (req, res) => {
		res.status(code.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};