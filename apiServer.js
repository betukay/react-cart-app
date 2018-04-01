"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
// MONGO LAB
// mongoose.connect(process.env.DATABASEURL);
// LOCAL DB
 mongoose.connect('mongodb://localhost:27017/bikeshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));

var Bikes = require('./models/bikes.js');

//----------SET UP SESSION----------------------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// SAVE TO SESSION CART API
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});

// GET SESSION CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

//------------- END OF SESSION -----------------


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
app.get('/bikes', function(req, res){
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
      console.log("# API DELETE BIKE:", err);
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

//----------- GET IMAGES API -------------
app.get('/images', function(req, res){

  const imgdir = __dirname + '/public/images';
  //REQUIRE FILE SYSTEM
  const fs = require('fs');
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgdir, function(err, files){
    if(err){
      return console.log(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    //ITERATE ALL IMAGES IN DIR AND ADD TO ARRAY
    files.forEach(function(file){
      filesArr.push({name: file});
    });
    //SEND THE JSON RESPONSE WITH ARRAY
    res.json(filesArr);
  })
})

// End APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
});
