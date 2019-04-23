module.exports = function (wallaby) {

	return {
		files: ['src/**/*.js?(x)', 'package.json', 'tests/**/*.js', '!tests/**/*-test.js?(x)'],

		tests: ['tests/**/*-test.js?(x)'],

		env: {
			type: 'node',
			runner: 'node',
			params: {
				env: 'ENVIRONMENT=development'
			}
		},

		testFramework: 'jest',

		filesWithNoCoverageCalculated: ['tests/**/*.js', 'src/server/server.js', 'src/client/index.jsx'],

		compilers: {
			'**/*.js?(x)': wallaby.compilers.babel()
		}
	};
};