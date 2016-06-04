angular.module('timer')
.controller("sitsController", ["sitFactory", function(Sit){
    this.sits = Sit.query();
  }]);
