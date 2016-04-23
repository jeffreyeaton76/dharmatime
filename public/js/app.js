"use strict";
(function(){
  angular.module("timer", ["ngResource"])
  .factory("sitFactory", sitFactoryFunc)
  .controller("timerController", ["sitFactory", timerControllerFunc])



function timerControllerFunc(Sit){
  this.sits = Sit.query()
}

function sitFactoryFunc($resource){
  return $resource("/api/sits/:id")
}

})();
