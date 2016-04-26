var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("mongoose");
var parser = require("body-parser");
mongoose.connect("mongodb://localhost/timer");

var SitSchema = new mongoose.Schema(
  {
    date: {type: Date},
    durationset: String,
    duration: Number
  }
);

var Sit = mongoose.model("Sit", SitSchema);

var app = express();

app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

// Sit.create({
//   date: '2015-12-08',
//   durationset: 30,
//   duration: 90
// });

app.get("/api", function(req, res){
  Sit.find().then(function(sits){
    res.json(sits);
  });
});

app.post("/api", function(req, res){
  console.log(req.body);
  Sit.create({durationset: req.body.durationset}).then(function(){
    res.json({success: true});
  });
});

app.get("/", function(req, res){
  res.render("timer");
});

app.listen(3000);
