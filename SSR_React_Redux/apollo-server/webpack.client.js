const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  // client의 root file
  entry: './src/client/client.js',

  // 생성될 output의 위치
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
};

module.exports = merge(baseConfig, config);