module.exports = {
  entry: './src/index.js',
  devtool: 'sourcemap',
  module: {
    rules: [
      {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: "babel-loader"
      },
      {
        test: /\.css$/,
        include: [
          /flexboxgrid/,
          /src/
        ],
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  output: {
    filename: './build/bundle.js'
  }
};