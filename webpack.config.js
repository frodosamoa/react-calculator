module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  output: {
    filename: './build/bundle.js'
  }
};