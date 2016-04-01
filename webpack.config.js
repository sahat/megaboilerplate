var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './site/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      //// Skip any files outside of these directories
      //include: [
      //  path.resolve(__dirname, 'src'),
      //  path.resolve(__dirname, 'routes.js'),
      //  path.resolve(__dirname, 'utils'),
      //  path.resolve(__dirname, 'generators'),
      //  path.resolve(__dirname, 'modules')
      //],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      query: {
        plugins: [
          ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }]
        ]
      }
    }]
  }
};
