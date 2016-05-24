'use strict';

/**
* Module dependencies.
*/
var express  = require("express");
var hbs      = require("express-handlebars");
var parser   = require("body-parser");
var favicon  = require("serve-favicon");
var path     = require("path");


module.exports.init = function(){
  var app = express();
  app.set("view engine", "hbs");
  app.engine(".hbs", hbs({
    extname: ".hbs",
    partialsDir: "views/",
    layoutsDir: "views/",
    defaultLayout: "layout-main"
  }));
  app.use(favicon('./public/favicon.ico'));
  app.use("/assets", express.static("public"));
  app.use(parser.json({extended: true}));
  app.set("port", process.env.PORT || 3001);
  return app;
}
