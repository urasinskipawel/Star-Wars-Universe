module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh', 'react', 'react-hooks'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		quotes: ['error', 'single'],
	},
};
