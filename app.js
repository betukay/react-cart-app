var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bikeshop');

var Bikes = require('./models/bikes.js');

//-------------- POST ----------------------

app.post('/bikes', function(req, res){
  var bike = req.body;

  Bikes.create(bike, function(err, bikes){
    if(err){
      throw err;
    }
    res.json(bikes);
  })
});

//-------------- GET ----------------------
app.get('/bikes', function(req,res){
  Bikes.find(function(err, bikes){
    if(err){
      throw err;
    }
    res.json(bikes);
  })
});

//-------------- GET ----------------------
app.delete('/bikes/:_id', function(req, res){
  var query = {_id: req.params._id};

  Bikes.remove(query, function(err, bikes){
    if(err){
      throw err;
    }
    res.json(bikes);
  })
});

// End APIs

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

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
