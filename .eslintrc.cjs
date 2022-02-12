module.exports = {
	extends: ['@taknepoidet-config/eslint-config'],
	overrides: [
		{
			files: ['*.ts'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: ['tsconfig.json', './tsconfig.json']
			}
		}
	]
};
