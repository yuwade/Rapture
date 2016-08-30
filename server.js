// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var router = require('./router');
// var app = express()
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())
// app.use(session({
 // secret: '12345',
 // resave: false,
 // saveUninitialized: true,
// }));
// router(app);

// console.log('listen(3000)')
// app.listen(3000)


var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static')
var router = require('./router');

var webpack = require('webpack');
var webpackConfig = require('./public/www/webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackConfig);

var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(serveStatic(__dirname+'/public', {'index': ['index.html', 'default.htm']}))
app.use(session({
 secret: '12345',
 resave: false,
 saveUninitialized: true,
}));
router(app);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

console.log('listen(3000)')
app.listen(3000)