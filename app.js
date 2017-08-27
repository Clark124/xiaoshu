require('babel-register');
var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models/db')

var passport = require('passport'); 
var session = require('express-session');

var index = require('./routes/index');
var regist = require('./routes/regist');
var login = require('./routes/login')
var header = require('./routes/header')
var auth = require('./routes/auth');
var article = require('./routes/article')
var setting = require('./routes/setting')
var attention = require('./routes/attention')
var favorite = require('./routes/favorite')
var home = require('./routes/home')
var setPassword = require('./routes/setPassword')

function getAssetManifest() {
  //const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '/../build/asset-manifest.json');
  const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '/../build/asset-manifest.json');
  return JSON.parse(content);
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/avatar',express.static('./avatar'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/regist', regist);
app.use('/auth',auth)
app.use('/article',article)
app.use('/login',login)
app.use('/header',header)
app.use('/setting',setting)
app.use('/attention',attention)
app.use('/favorite',favorite)
app.use('/home',home)
app.use('/setPassword',setPassword)


app.get('*', (req, res) => {

res.render('index', {
    title: '小书',
    PUBLIC_URL: '/',
    assetManifest: require('./public/asset-manifest.json')
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
