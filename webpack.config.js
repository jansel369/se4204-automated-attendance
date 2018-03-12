const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/frontend/index.jsx',
  ],
  output: {
    path: path.join(process.cwd(), '/public/js/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        { loader: 'babel-loader' },
      ],
      exclude:
      /node_modules/,
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
        }],
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&' +
      'includePaths[]=' +
      (encodeURIComponent(
        path.resolve(process.cwd(), './node_modules')
      )) +
      '&includePaths[]=' +
      (encodeURIComponent(
          path.resolve( process.cwd(),
            './node_modules/grommet/node_modules'))
      )
    }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
};
