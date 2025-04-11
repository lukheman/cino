var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const quoteRouter = require('./routes/quote');

const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'layout/main');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: 'citrawulandari', // ganti dengan string acak untuk keamanan
  resave: false,
  saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/quote', quoteRouter);

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
  res.render('error', {title: 'Error'});
});

module.exports = app;

// app.listen(3000, () => {
//     console.log('server listening at http://localhost:3000');
// });
