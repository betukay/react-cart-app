var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

//-------------- DELETE ----------------------
app.delete('/bikes/:_id', function(req, res){
  var query = {_id: req.params._id};

  Bikes.remove(query, function(err, bikes){
    if(err){
      throw err;
    }
    res.json(bikes);
  })
});

//------- UPDATE <---------
app.put('/bikes/:_id', function(req, res){
  var bike = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title:bike.title,
      description:bike.description,
      image:bike.image,
      price:bike.price
    }
  };
    // When true returns the updated document
    var options = {new: true};

    Bikes.findOneAndUpdate(query, update, options, function(err, bikes){
      if(err){
        throw err;
      }
      res.json(bikes);
    })

})

// End APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
