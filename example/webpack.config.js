const path = require('path');

module.exports = {
    devtool: 'eval',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/public/'),
        filename: 'bundle.js',
        publicPath: '/public/',
    },
    devServer: {
      contentBase: path.join(__dirname, '/public/'),
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
    },
    resolve: {
        alias: {
            'redux-force': path.join(__dirname, '..', 'lib'),
        },
    },
};
