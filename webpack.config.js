/*module.exports = {
  entry: ['/src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: '/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};*/

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '/public');
var APP_DIR = path.resolve(__dirname, 'src');
console.log(APP_DIR);
console.log(__dirname);
console.log("----------------------------");
var config = {
  entry: APP_DIR+'/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  mode :"development",
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;