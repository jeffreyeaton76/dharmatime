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

"use strict";
(function(){
  angular.module("timer")
  .factory("sitFactory", sitFactoryFunc)


  function sitFactoryFunc($resource){
    return $resource("/api/sits/:id")
  }
})();

"use strict";
(function(){
  angular.module("timer")
  .controller("timerController", ["sitFactory", timerControllerFunc])

  
  function timerControllerFunc(Sit){
    this.sits = Sit.query()
  }


})();
