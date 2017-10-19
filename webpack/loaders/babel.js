module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        }
    }
}