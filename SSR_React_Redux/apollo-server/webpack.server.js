const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const config = {
  // bundle을 브라우저가 아닌 nodeJS를 위해 만듬
  target: 'node',

  // 서버 앱의 root file
  entry: './src/index.js',

  // 생성될 output의 위치
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);