module.exports = {
	rules: {
		'import/first': 0
	},
	overrides: [
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				sourceType: 'module',
				project: ['tsconfig.json', './tsconfig.json', './test/tsconfig.json']
			}
		}
	]
};
