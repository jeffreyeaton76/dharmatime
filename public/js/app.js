"use strict";
(function(){
  angular.module("timer", ["ngResource", "ui.router"])
  .config([
    "$stateProvider",
    routerFunction
  ])
  .factory("sitFactory", sitFactoryFunc)
  .factory("newFactory", newFactoryFunc)
  .controller("sitsController", ["sitFactory", sitsControllerFunc])
  .controller("indexController", ["sitFactory", indexControllerFunc])
  .controller("newController", ["sitFactory", newControllerFunc])
  .controller("sessionController", ["sitFactory", sessionControllerFunc]);


  function routerFunction($stateProvider){
    $stateProvider
    .state("index", {
      url:"/",
      templateUrl:"/assets/html/index.html",
      controller:"indexController",
      controllerAs:"indexVM"
    })
    .state("sits", {
      url:"/sits",
      templateUrl:"/assets/html/sits.html",
      controller:"sitsController",
      controllerAs:"sitsVM"
    })
    .state("new", {
      url:"/new",
      templateUrl:"/assets/html/new.html",
      controller:"newController",
      controllerAs:"newVW"
    })
    .state("session", {
      url:"/session",
      templateUrl:"/assets/html/session.html",
      controller:"sessionController",
      controllerAs:"sessionVM"
    });
  }

  function sitsControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function newControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function indexControllerFunc(Sit){
    this.sits = Sit.query();
  }

  function sessionControllerFunc(session){
    this.session = session.query();
  }

  function sitFactoryFunc($resource){
    return $resource("/api/sits/:id");
  }

  function newFactoryFunc($resource){
    return $resource("/new");
  }

})();
