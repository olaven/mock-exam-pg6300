module.exports = function (wallaby) {

	return {
		files: ["src/**/*.js?(x)", "package.json"],

		tests: ["tests/**/*.test.js?(x)"],


		env: {
			type: "node",
			runner: "node"
		},

		testFramework: "jest",

		filesWithNoCoverageCalculated: ["tests/**/*.js", "src/server.js"],

		compilers: {
			"**/*.js?(x)": wallaby.compilers.babel()
		}
	};
};