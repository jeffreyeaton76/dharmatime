"use strict";
(function(){
  angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    routerFunction
  ])
  .factory("sitFactory", sitFactoryFunc)
  .controller("timerController", ["sitFactory", timerControllerFunc])


function routerFunction($stateProvider){
  $stateProvider
  .state("index", {
    url:"/",
    templateUrl:"/views/index.html",
    controller:"timerController",
    controllerAs:"tc"
  })
}
function timerControllerFunc(Sit){
  this.sits = Sit.query()
}

function sitFactoryFunc($resource){
  return $resource("/api/sits/:id")
}

})();
