const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/loaders/pug');
const css = require('./webpack/loaders/css');
const babel = require('./webpack/loaders/babel');
const devserver = require('./webpack/devserver');
const scss = require('./webpack/loaders/scss');
const extractCSS = require('./webpack/loaders/css.extract');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/pages/index/index.js',
            'blog': PATHS.source + '/pages/blog/blog.js'
        },
        output: {
	        path: PATHS.build,
            filename: 'js/[name].js'
        },
        plugins: [
  	        new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
		        template: PATHS.source + '/pages/index/index.pug'
  	        }),
            new HtmlWebpackPlugin({
                filename: 'blog.html',
                chunks: ['blog', 'common'],
                template: PATHS.source + '/pages/blog/blog.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
    babel(),
    pug()
]);

module.exports = function(env) {
	if(env === 'production') {
		return merge([
		    common,
            extractCSS()
        ]);
	}
	if(env === 'development') {
		return merge([
		    common,
            devserver(),
            css(),
            scss()
        ]);
	}
};