"use strict";
(function(){
  angular.module("timer")
  .controller("timerController", ["sitFactory", timerControllerFunc])

  
  function timerControllerFunc(Sit){
    this.sits = Sit.query()
  }


})();
