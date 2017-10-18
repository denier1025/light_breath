module.exports = function () {
    return {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
            pretty: true
        }
    }
}