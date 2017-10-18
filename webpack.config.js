const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

module.exports = {
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
		{ 
			test: /\.js$/, 
			use: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			use: ExtractTextWebpackPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		},
		{
			test: /\.pug$/,
			loader: 'pug-loader',
			options: {
				pretty: true
			}
		}
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
    }),
	new ExtractTextWebpackPlugin('[name].css')
  ]
};