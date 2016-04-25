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

app.use(express.static("public"));

Sit.create({
  date: '2015-12-08',
  duration_set: 20,
  duration: 20
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/sits", function(req, res){
  Sit.find().then(function(sits){
    res.json(sits);
  });
});


app.listen(3000);
