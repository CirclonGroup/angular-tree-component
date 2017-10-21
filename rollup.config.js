import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import alias from 'rollup-plugin-alias';

export default {
  format: 'umd',
  moduleName: 'angular-tree-component',
  plugins: [
    nodeResolve({ jsnext: true, main: true, module: true }),
        alias({
            'lodash': 'node_modules/lodash-es/lodash.js'
        }),
    commonjs()
    //,uglify()
  ],
  sourceMap: true,
  external: [
    '@angular/core',
    '@angular/common',
    'lodash-es'
  ]
};
