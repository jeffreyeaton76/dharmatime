angular.module('timer')
.controller('loginCtrl', function ($state, authentication) {
  var vm = this;

  vm.credentials = {
    email : "",
    password : ""
  };

  vm.onSubmit = function () {
    console.log("login?");
    authentication
    .login(vm.credentials)
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $state.go('new');
    });
  };

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();
});