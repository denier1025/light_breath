const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = function() {
    return {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
        })
    }
}