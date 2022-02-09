export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	maxConcurrency: 10,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	// coverageThreshold: {
	// 	global: {
	// 		branches: 98,
	// 		functions: 98,
	// 		lines: 98,
	// 		statements: 98
	// 	}
	// },
	bail: 3,
	globals: {
		'ts-jest': {
			useESM: false,
			tsconfig: './test/tsconfig.json'
		}
	}
};
