import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;
const plugins = [
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
