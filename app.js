var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sesssion = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var termsandcondition = require('./routes/termsandcondition');
var register = require('./routes/register');
var ajax = require('./routes/ajax');
var login = require('./routes/login');
var center = require('./routes/center');
var keeper = require('./routes/keeper');
var about = require('./routes/about');
var contactus = require('./routes/contactus');
var help = require('./routes/help');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sesssion({secret:'sandeep',saveUninitialized:true,resave:true,cookie:{maxAge:900000}}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/t&c',termsandcondition);
app.use('/about',about);
app.use('/registpage',register);
app.use('/ajax',ajax);
app.use('/loginpage',login);
app.use('/center',center);
app.use('/keeper',keeper);
app.use('/contactus',contactus);
app.use('/help',help);

app.get('/logout',function(req,res){
  let session = req.session;
  session.destroy();
  res.render('index',{title:"Visitors"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
