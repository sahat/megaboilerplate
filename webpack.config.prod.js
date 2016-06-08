var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname,'website', 'main'),
  output: {
    path: path.join(__dirname, 'website', 'assets', 'js'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/js/'
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    function() {
      this.plugin('done', function(stats) {
        require('fs').writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(stats.toJson()));
      });
    }
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'website'),
      loaders: ['babel']
    }]
  }
};
