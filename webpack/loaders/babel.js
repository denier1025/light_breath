module.exports = function () {
    return {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
    }
}