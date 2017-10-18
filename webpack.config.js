const path = require('path');
/*const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/loaders/pug');
const css = require('./webpack/loaders/css');
const babel = require('./webpack/loaders/babel');
const devserver = require('./webpack/devserver');
const scss = require('./webpack/loaders/scss');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

const common = {
  entry: {
      'index': PATHS.source + '/pages/index/index.js',
      'blog': PATHS.source + '/pages/blog/blog.js'
  },
  output: {
	path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    rules: [
		babel(),
        scss(),
		pug()
	]
  },
  plugins: [
  	new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index'],
		template: PATHS.source + '/pages/index/index.pug'
  	}),
    new HtmlWebpackPlugin({
        filename: 'blog.html',
        chunks: ['blog'],
        template: PATHS.source + '/pages/blog/blog.pug'
    })/*,
	new ExtractTextWebpackPlugin('[name].css')*/
    ]
};

module.exports = function(env) {
	if(env === 'production') {
		return common;
	}
	if(env === 'development') {
		return merge([common, devserver()]);
	}
};