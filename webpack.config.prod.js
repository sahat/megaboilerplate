var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main',
  output: {
    path: path.join(__dirname, 'website', 'assets', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }]
  },
  progress: true,
  resolve: {
    root: path.join(__dirname, 'website'),
    modulesDirectories: ['node_modules']
  }
};
