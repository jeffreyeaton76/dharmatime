angular.module('timer')
.controller('logoCircleCtrl', function (authentication) {
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

  vm.logout = function (){
    authentication.logout();
    vm.currentUser = false;
  };

});