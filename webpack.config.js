const path = require('path');
const webpack = require('webpack');

const globalHeaderPath = 'cross-domains-header';

const commonConfig = {
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist/${name}'),
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

const productionConfig = {
  ...commonConfig,
  mode: 'production'
};

const developmentConfig = {
  ...commonConfig,
  optimization: {
    minimize: false
  },
  devtool: 'source-map',
  mode: 'development'
};

module.exports = [
  {
    ...productionConfig,
    entry: `./src/${globalHeaderPath}/index.js`,
    output: {
      ...productionConfig.output,
      path: path.resolve(__dirname, `dist/${globalHeaderPath}`)
    }
  },
  {
    ...developmentConfig,
    entry: `./src/${globalHeaderPath}/index.js`,
    output: {
      ...developmentConfig.output,
      path: path.resolve(__dirname, `dist-local/${globalHeaderPath}`)
    }
  }
];
