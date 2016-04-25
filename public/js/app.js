"use strict";
(function(){
  angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    routerFunction
  ])
  .factory("sitFactory", sitFactoryFunc)
  .controller("timerController", ["sitFactory", timerControllerFunc])
  .controller("indexController", ["sitFactory", indexControllerFunc]);


  function routerFunction($stateProvider){
    $stateProvider
    .state("index", {
      url:"/",
      templateUrl:"/views/index.html",
      controller:"timerController",
      controllerAs:"tc"
    })
    .state("sits", {
      url:"/sits",
      templateUrl:"/views/sits.html",
      controller:"timerController",
      controllerAs:"tc"
    });
  }

  function timerControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function indexControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function sitFactoryFunc($resource){
    return $resource("/api/sits/:id");
  }


})();
