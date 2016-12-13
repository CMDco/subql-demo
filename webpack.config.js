const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var sass = require('sass-loader');

module.exports = {
  // specifies the entry files
  // when provided with array it will go through all the files
  entry: [
    './client/index.jsx',
  ],
  // specifies where webpack will dump the compiled files
  output: { 
    path: './dist/',
    filename: 'bundle.js'
  },
  // loader specifies the preprocessor
  module: {
    loaders: [
      {
        test: /\.jsx?/, 
        loader: 'babel',
        include: path.join(__dirname, 'client')
      },
      {
        test: /scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }, 
  // additional functionality. htmlwebpackplugin or minify goes here
  plugins: [
    // Auto generate our html page https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      appMountId: 'root',
      title: 'Hello',
    })
  ]
};