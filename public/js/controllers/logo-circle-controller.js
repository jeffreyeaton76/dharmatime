angular.module('timer')
.controller('logoCircleCtrl', function($location, authentication) {
  var vm = this;

  vm.isLoggedIn = authentication.isLoggedIn();

  vm.currentUser = authentication.currentUser();

});