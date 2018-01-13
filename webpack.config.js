const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'sourcemap',
  module: {
    rules: [
      {
       test: /\.js$/,
       loader: 'babel-loader',
       exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
        ],
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'sass-loader'
        ]
      }
    ]
  },
  output: {
    filename: './build/bundle.js'
  }
};