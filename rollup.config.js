import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;
const plugins = [
	replace({
		preventAssignment: true,
		'process.env.NODE_ENV': JSON.stringify('development')
	}),
	json(),
	commonjs(),
	typescript({
		tsconfig: './tsconfig.json',
		exclude: ['test/**', 'example/**']
	})
];

if (production === true) {
	plugins.push(terser());
}
export default [
	{
		input: './src/api-server/index.ts',
		output: [
			{
				file: './app/api.js',
				format: 'es'
			}
		],
		plugins
	},
	{
		input: './src/console/index.ts',
		output: [
			{
				file: './app/cli.js',
				format: 'es'
			}
		],
		plugins
	}
];
