// import 구간
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
var passport = require('passport')

// router 설정
var indexRouter = require('./routes/view');
var itemApiRouter = require('./routes/itemApi');
var userApiRouter = require('./routes/userApi')

// express() 앱 실행
var app = express();

// view templates engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 앱 설정 - 미들웨어를 연결하는 부분
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// passport는 내부적으로 session을 사용하기 떄문에, 미들웨어의 장착 순서(app.use)가 반드시 session뒤에 존재해야 됨
// 이게 먼저 실행이 된다음 router로 넘어가기 때문에 router에서 require로 모듈을 불러오면 됨
// passport와 세션설정
app.use(session({
    secret:"#JDKLF439jsdlfsjl",
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(app, passport)

// path 설정
app.use('/', indexRouter);
app.use('/api', itemApiRouter);
app.use('/user', userApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 기본 경로 or /users 말고 다른 경로로 진입했을 경우 실행
  next(createError(404)); // next() 덕분에 다음 미들웨어로 넘어가는 것
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
