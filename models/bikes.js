"use strict"
var mongoose = require('mongoose');

var bikesSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

var Bikes = mongoose.model('Bikes', bikesSchema);
module.exports = Bikes;
