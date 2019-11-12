const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

// const db = require('./db/connection');
// pools will use environment variables
// for connection information

// db.query('SELECT NOW() ', (err, res) => {
//   // pool.end();
// });
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ data: 'error' });
  next();
});

module.exports = app;
