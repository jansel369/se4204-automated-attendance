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
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules'],
          },
        },
      ],
    }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
};
