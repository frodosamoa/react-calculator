const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js')
const compiler = webpack(config);
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Example app listening on port 3000!');
});