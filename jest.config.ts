/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	maxConcurrency: 10,
	collectCoverage: false,
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 98,
			functions: 98,
			lines: 98,
			statements: -10
		}
	}
};
