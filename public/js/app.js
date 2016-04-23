"use strict";
(function(){
  angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    routerFunction
  ])



function routerFunction($stateProvider){
  $stateProvider
  .state("index", {
    url:"/",
    templateUrl:"/views/index.html",
    controller:"timerController",
    controllerAs:"tc"
  })
}



})();
