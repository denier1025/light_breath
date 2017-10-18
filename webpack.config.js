const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
		port: 9000
    }
};

module.exports = function(env) {
	if(env === 'production') {
		return common;
	}
	if(env === 'development') {
		return Object.assign(common, developmentConfig);
	}
};