const { codes } = require("../../shared/http");
const authApi = require("../routes/auth-api");

const configureREST = (app) => {

	app.use("/api", authApi);
	app.all("/api*", (req, res) => {
		res.status(codes.NOT_FOUND).send();
	});
};

module.exports = {
	configureREST
};