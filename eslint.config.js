import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import {defineConfig} from 'eslint/config';

export default defineConfig([
	{
		ignores: ['dist', 'node_modules'],
	},

	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: {
			js,
			'react-refresh': reactRefresh,
		},
		extends: ['js/recommended'],
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
				},
			],
			'no-tabs': ['error', {allowIndentationTabs: true}],
			quotes: [
				'error',
				'single',
				{
					avoidEscape: true,
				},
			],
			'quote-props': ['error', 'as-needed'],
			'jsx-quotes': ['error', 'prefer-double'],
			'max-len': [
				'warn',
				{
					code: 100,
					comments: 120,
					ignoreUrls: true,
					ignoreRegExpLiterals: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
				},
			],
			'eol-last': 'error',
			'no-trailing-spaces': 'warn',
			'no-multi-spaces': 'error',
			'key-spacing': [
				'error',
				{
					afterColon: true,
				},
			],
			'comma-dangle': ['warn', 'always-multiline'],
			semi: ['error', 'always'],
			'no-cond-assign': ['error', 'except-parens'],
			'block-spacing': ['error', 'always'],
			'space-in-parens': ['error', 'never'],
			'dot-notation': 'off',
			'func-names': 'off',
			'one-var': 'off',
			'vars-on-top': 'off',
			'no-unused-vars': ['warn', {varsIgnorePattern: '^_?[A-Z]'}],
			'computed-property-spacing': ['error', 'never'],
			curly: 'off',
			'no-inline-comments': 'off',
			'one-var-declaration-per-line': 'off',
			'space-unary-ops': [
				'error',
				{
					words: false,
				},
			],
			'brace-style': ['warn', '1tbs'],
			'array-bracket-spacing': ['error', 'never'],
			'object-curly-spacing': ['error', 'never'],
			'dot-location': ['error', 'property'],
			'spaced-comment': ['warn', 'always', {markers: ['////'], exceptions: ['/']}],
			'arrow-spacing': ['error', {before: true, after: true}],
			'comma-spacing': ['error', {before: false, after: true}],
			'comma-style': ['error', 'last'],
			'keyword-spacing': ['error'],
			'linebreak-style': 'off',
			'no-eq-null': 'off',
			'no-func-assign': ['error'],
			'no-mixed-spaces-and-tabs': ['error'],
			'semi-spacing': ['error', {before: false, after: true}],
			'space-before-blocks': ['error'],
			'space-before-function-paren': ['error', 'never'],
			'space-infix-ops': ['error'],
			'no-extra-semi': ['warn'],

			'react-refresh/only-export-components': 'warn',
		},
	},

	...tseslint.configs.recommended,

	{
		files: ['**/*.json'],
		plugins: {json},
		language: 'json/json',
		extends: ['json/recommended'],
	},

	{
		files: ['**/*.jsonc'],
		plugins: {json},
		language: 'json/jsonc',
		extends: ['json/recommended'],
	},

	{
		files: ['**/*.json5'],
		plugins: {json},
		language: 'json/json5',
		extends: ['json/recommended'],
	},

	{
		files: ['**/*.md'],
		plugins: {markdown},
		language: 'markdown/commonmark',
		extends: ['markdown/recommended'],
	},

	{
		files: ['**/*.css'],
		plugins: {css},
		language: 'css/css',
		extends: ['css/recommended'],
	},
]);
