module.exports = function (wallaby) {

	return {
		files: ["src/**/*.js?(x)", "package.json"],

		tests: ["tests/**/*.test.js?(x)"],


		env: {
			type: "node",
			runner: "node"
		},

		testFramework: "jest",

		compilers: {
			"**/*.js?(x)": wallaby.compilers.babel()
		}
	};
};