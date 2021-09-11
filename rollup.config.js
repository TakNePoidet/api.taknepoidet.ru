import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const plugins = [
	// resolve({
	// 	preferBuiltins: true
	// }),
	// json(),
	// commonjs(),
	typescript({
		tsconfig: './tsconfig.json',
		exclude: ['test/**', 'example/**']
	})
];

if (production === true) {
	plugins.push(
		terser(),
		license({
			sourcemap: false,
			banner: {
				commentStyle: 'regular',
				content: {
					file: path.join(__dirname, 'LICENSE'),
					encoding: 'utf-8'
				}
			},
			thirdParty: {
				includePrivate: true,
				output: {
					file: path.join(__dirname, 'dist', 'dependencies.txt'),
					encoding: 'utf-8'
				}
			}
		})
	);
}
export default [
	{
		input: './src/index.ts',
		output: [
			{
				file: './app/index.js',
				format: 'cjs'
			}
		],
		plugins
	}
];
