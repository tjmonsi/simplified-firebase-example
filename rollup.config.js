import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'public/index.js',
    format: 'umd'
  },
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs()
  ]
};
