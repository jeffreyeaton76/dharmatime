var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/timer");

var Sit = mongoose.model("Sit", {
  date: {type: Date},
  duration_set: Number,
  duration: Number
});

var app = express();

Sit.create({
  date: '2015-12-08',
  duration_set: 20,
  duration: 20
});

app.get("/api/sits", function(req, res){
  Sit.find().then(function(err, sits){
    if(err){
      console.log(err);
    }
    else{
      res.json(sits);
    }
  });
});

// app.get("/", function(req, res){
//   res.send("working");
// });

app.listen(3000);
