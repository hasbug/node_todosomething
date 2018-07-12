var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./api/users');
var todoRouter = require('./api/todo');
var oilStationRouter = require('./api/oilstation');
var db = require('./api/controllers/db')

var app = express();

// 监听端口，等待连接
const port = 8088;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//session
app.use(session({
  secret:  'secret', 
  name: 'checkin',
  resave: false,
  saveUninitialized: true,
  cookie : {
    maxAge : 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter);
app.use('/oilstation', oilStationRouter);




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
