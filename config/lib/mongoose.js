'use strict';

var mongoose = require('mongoose');
var users = require('./users');

module.exports.connect = function (){
  if(process.env.NODE_ENV == "production"){
    mongoose.connect(process.env.MONGODB_URI);
  }else{
    mongoose.connect("mongodb://localhost/timer");
  }
}

var SitSchema = new mongoose.Schema(
  {
    date: {type: Date},
    durationset: Number,
    duration: Number,
    notes: String
  }
);

module.exports.Sit = mongoose.model("Sit", SitSchema);
