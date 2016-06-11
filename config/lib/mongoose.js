'use strict';

var mongoose = require('mongoose');

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

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

module.exports.Sit = mongoose.model("Sit", SitSchema);
