var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
	// "webpack-dev-server/client?http://localhost:3000",
    // "webpack/hot/only-dev-server",
	'webpack-hot-middleware/client?path=http://localhost:3000',
	path.resolve(__dirname, './app/main.js')],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
	publicPath: "http://localhost:3000/build"
  },
 
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
		loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      }]
  },
   plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};