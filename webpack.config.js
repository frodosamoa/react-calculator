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
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  output: {
    filename: './build/bundle.js'
  }
};