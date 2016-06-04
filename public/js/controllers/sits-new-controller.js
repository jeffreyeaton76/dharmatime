angular.module('timer')
.controller("newController", ["sitFactory", "$state", function(Sit, $state){
    var newVM = this;
    newVM.new_sit = new Sit();
    newVM.create = function(){
      newVM.new_sit.$save().then(function(response){
        $state.go("session");
      });
    };
  }]);
