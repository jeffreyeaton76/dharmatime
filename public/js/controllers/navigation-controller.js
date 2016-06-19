angular.module('timer')
.controller('navigationCtrl', function($location, authentication) {
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

});