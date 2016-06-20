angular.module('timer')
.controller("registerCtrl", function ($state, authentication) {
  var vm = this;

  vm.credentials = {
    name : "",
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
    authentication
    .register(vm.credentials)
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $state.go('new');
    });
  };
});