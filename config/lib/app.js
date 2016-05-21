'use strict';

/**
 * Module dependencies.
 */
var express  = require("./express");
var mongoose = require("mongoose");

var app = express.init();

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect("mongodb://localhost/timer");
}

var SitSchema = new mongoose.Schema(
  {
    date: {type: Date},
    durationset: Number,
    duration: Number,
    notes: String
  }
);

var Sit = mongoose.model("Sit", SitSchema);


app.get("/api", function(req, res){
  Sit.find().then(function(sits){
    res.json(sits);
  });
});

app.post("/api", function(req, res){
  Sit.create({date: Date.now(), durationset: req.body.durationset, duration: 0, notes: ''}).then(function(){
    res.json({success: true});
  });
});

app.put("/api", function(req, res){
  Sit.findOne({}, {}, {sort: {'date': -1}}, function(err, doc){
    doc.duration = req.body.duration;
    doc.notes = req.body.notes;
    doc.save();
    res.json({success: true});
  });
});

app.get("/*", function(req, res){
  res.render("timer");
});

app.listen(app.get("port"), function(){
});
