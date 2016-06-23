angular.module('timer')
.directive('loginDirective', function(){
    return {
      replace: false,
      restrict: 'E',
      scope: {},
      controller: 'loginCtrl',
      controllerAs: 'vm',
      templateUrl: 'assets/templates/directives/login.html'
    };
  });
