module.exports = function(paths) {
    return {
        test: /\.scss$/,
        include: paths,
        use: ['style-loader', 'css-loader', 'sass-loader']
    }
}