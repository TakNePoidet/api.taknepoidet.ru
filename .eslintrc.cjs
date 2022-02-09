module.exports = {
	extends: ['@taknepoidet-config/eslint-config'],
	overrides: [
		{
			files: ['*.test.ts', 'setup.ts'],
			plugins: ['jest'],
			rules: {
				'jest/no-disabled-tests': 'warn',
				'jest/no-focused-tests': 'error',
				'jest/no-identical-title': 'error',
				'jest/prefer-to-have-length': 'warn',
				'jest/valid-expect': 'error'
			},
			env: {
				'jest/globals': true
			}
		},
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				sourceType: 'module',
				project: ['tsconfig.json', './tsconfig.json']
			}
		}
	]
};
