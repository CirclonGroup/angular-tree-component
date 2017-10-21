import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  format: 'umd',
  moduleName: 'angular-tree-component',
  plugins: [
    nodeResolve({ jsnext: true, main: true, module: true }),
    commonjs(),
    uglify()
  ],
  sourceMap: true,
  external: [
    '@angular/core',
    '@angular/common',
    'lodash'
  ]
};
