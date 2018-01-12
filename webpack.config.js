module.exports = {
  entry: './src/index.js',
  rules: [
    {
    	test: /\.js$/,
    	exclude: /node_modules/,
    	loader: "babel-loader"
    }
  ],
  output: {
    filename: './build/bundle.js'
  }
};